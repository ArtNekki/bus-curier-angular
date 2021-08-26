import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import addressPoints from 'src/app/mock-data/address-points';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {concatAll, first, map, switchMap} from 'rxjs/operators';
import CityFrom from '../../../../../../core/models/CityFrom';
import Select from '../../../../../../core/models/Select';
import CityTo from '../../../../../../core/models/CityTo';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-pickup-point-form',
  templateUrl: './pickup-point-form.component.html',
  styleUrls: ['./pickup-point-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickupPointFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PickupPointFormComponent),
      multi: true
    }
  ]
})
export class PickupPointFormComponent extends SubFormComponent implements OnInit, OnDestroy {
  @Input() noLabel: boolean;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;
  public Tab = {One: 'department', Two: 'courier'};

  public tabsReceived = false;
  public dataLoading = false;

  public cities = [];
  public offices = [];
  public cityData = {};

  private citiesSub: Subscription;
  private officesSub: Subscription;
  private tabsSub: Subscription;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calcService: CalculatorService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl({value: '', disabled: true}, [Validators.required]),
      [FormControlName.ReceiveData]: new FormGroup({
        [FormControlName.Active]: new FormControl('', [Validators.required]),
        // [FormControlName.Department]: new FormControl('', [Validators.required]),
        // [FormControlName.Courier]: new FormControl('')
      })
    });

    this.citiesSub = this.orderForm.cityFrom$
      .pipe(
        switchMap((id: string) => {
          return this.calcService.getCityTo(id, 0);
        }),
        map<CityTo, Select>((cities: any) => {
          return cities
            // .filter((city) => city.site_id !== Department.Aleutskaya && city.site_id !== Department.Gogolya)
            .map((city) => {
              this.cityData[city.id] = city;
              return {value: city.id, name: city.name};
            });
        })
      )
      .subscribe((cities: any) => {
        if (cities.length) {
          this.cities = cities;
          this.formGroup.get(FormControlName.Location).enable();
        }
      });

    // this.calculatorService.getDistricts(1).subscribe((result: Array<{id: string, name: string}>) => {
    //   this.cities = result.map((el: {id: string, name: string}) => {
    //     return {value: el.id, name: el.name};
    //   });
    // });
  }

  changeType(type: string) {
    switch (type) {
      case this.Tab.One:
        this.formGroup.get(FormControlName.ReceiveData).get(this.Tab.One).setValidators([Validators.required]);
        this.formGroup.get(FormControlName.ReceiveData).get(this.Tab.Two).clearValidators();
        this.formGroup.get(FormControlName.ReceiveData).get(this.Tab.Two).setValue('');
        break;
      case this.Tab.Two:
        this.formGroup.get(FormControlName.ReceiveData).get(this.Tab.Two).setValidators([Validators.required]);
        this.formGroup.get(FormControlName.ReceiveData).get(this.Tab.One).clearValidators();
        this.formGroup.get(FormControlName.ReceiveData).get(this.Tab.One).setValue('');
        break;
    }
  }

  setCity(id: string) {
    this.getOffices(id);
    this.createNeedToMeetControl(id);
  }

  getOffices(id: string) {
    this.tabsSub = this.calcService.getOffices()
      .pipe(
        map((offices: any) => {
          return offices
            .filter((office) => office.office_id === this.cityData[id].office_id)
            .map((office) => {
              return {value: office.id, name: office.address};
            });
        })

      )
      .subscribe((offices: any) => {
        if (offices.length) {
          (this.formGroup.get(FormControlName.ReceiveData) as FormGroup).addControl('get', new FormControl(''));
          this.formGroup.get(FormControlName.ReceiveData).get(FormControlName.Active).setValue('get');
        }

        this.offices = offices;
      });
  }

  createNeedToMeetControl(id) {
    if (this.cityData[id].need_to_meet !== '0') {
      (this.formGroup.get(FormControlName.ReceiveData) as FormGroup).addControl('need-to-meet', new FormControl(''));

      const active = this.formGroup.get(FormControlName.ReceiveData).get(FormControlName.Active);

      if (!active.value) {
        active.setValue('need-to-meet');
      }

    }
  }

  ngOnDestroy(): void {
    if (this.citiesSub) {
      this.citiesSub.unsubscribe();
    }

    if (this.officesSub) {
      this.officesSub.unsubscribe();
    }

    if (this.tabsSub) {
      this.tabsSub.unsubscribe();
    }
  }
}
