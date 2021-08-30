import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
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
  @Output() onChangeCity: EventEmitter<string> = new EventEmitter<string>();
  @Input() noLabel: boolean;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;

  public Tab = {One: 'department', Two: 'courier'};
  public TabName = {
    get: 'Забрать в отделении',
    delivery: 'Вызвать курьера'
  };

  public isFormGroupDisabled = false;
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
      [FormControlName.Options]: new FormGroup({
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
        }
      });

    // this.calculatorService.getDistricts(1).subscribe((result: Array<{id: string, name: string}>) => {
    //   this.cities = result.map((el: {id: string, name: string}) => {
    //     return {value: el.id, name: el.name};
    //   });
    // });
  }

  changeType(type: string) {

    Object.entries((this.formGroup.get(FormControlName.Options) as FormGroup).controls)
      .forEach(([key, control]: [string, AbstractControl]) => {
        if (key !== FormControlName.Active) {
          control.clearValidators();
          control.setValue('');
        }
    });

    this.formGroup.get(FormControlName.Options).get(type).setValidators([Validators.required]);
  }

  setCity(id: string) {
    this.getOffices(id);
    this.createNeedToMeetControl(id);
    this.onChangeCity.emit(id);
  }

  getOffices(id: string) {
    this.tabsSub = this.calcService.getOffices()
      .pipe(
        map((offices: any) => {
          return offices
            .filter((office) => office.office_id === this.cityData[id].office_id)
            .map((office) => {
              return {value: office.id, name: office.address, delivery: office.delivery};
            });
        })

      )
      .subscribe((offices: any) => {
        if (offices.length) {
          (this.formGroup.get(FormControlName.Options) as FormGroup).addControl('get', new FormControl('', [Validators.required]));
          this.formGroup.get(FormControlName.Options).get(FormControlName.Active).setValue('get');

          if (+offices[0].delivery) {
            (this.formGroup.get(FormControlName.Options) as FormGroup).addControl('delivery', new FormControl(''));
          }
        }

        this.offices = offices;
      });
  }

  createNeedToMeetControl(id) {
    if (this.cityData[id].need_to_meet !== '0') {
      (this.formGroup.get(FormControlName.Options) as FormGroup).addControl('need-to-meet', new FormControl(''));

      const active = this.formGroup.get(FormControlName.Options).get(FormControlName.Active);

      if (!active.value) {
        active.setValue('need-to-meet');
      }

    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isFormGroupDisabled = isDisabled;

    if (isDisabled) {
      this.formGroup.get(FormControlName.Location).disable();
    } else {
      this.formGroup.get(FormControlName.Location).enable();
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
