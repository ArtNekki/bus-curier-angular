import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import addressPoints from 'src/app/mock-data/address-points';
import FormControlName from 'src/app/core/maps/FormControlName';
import { SubFormComponent } from '../sub-form/sub-form.component';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {Observable, PartialObserver, Subscription} from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import Office from '../../../../../../core/models/Office';
import {concatAll, first, map, take} from 'rxjs/operators';
import Select from 'src/app/core/models/Select';
import CityFrom from 'src/app/core/models/CityFrom';
import City from '../../../../../../core/maps/City';
import {fromArray} from 'rxjs/internal/observable/fromArray';

const Department = {
  Aleutskaya: '15',
  Gogolya: '7'
};

@Component({
  selector: 'app-departure-point-form',
  templateUrl: './departure-point-form.component.html',
  styleUrls: ['./departure-point-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeparturePointFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DeparturePointFormComponent),
      multi: true
    }
  ]
})
export class DeparturePointFormComponent extends SubFormComponent implements OnInit, OnDestroy {
  @Input() noLabel: boolean;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;
  public Tab = {One: 'give', Two: 'pickup'};
  public currentTab = null;
  public tabsReceived = false;

  public cities = [];
  public offices = [];
  public formattedData = {};

  private citiesSub: Subscription;
  private officesSub: Subscription;
  private tabsSub: Subscription;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calculatorService: CalculatorService,
              protected orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl('', [Validators.required]),
      [FormControlName.DispatchData]: new FormGroup({
        [FormControlName.Active]: new FormControl('', [Validators.required]),
      }, [Validators.required]),
      [FormControlName.Date]: new FormControl('', [Validators.required]),
    });

    this.currentTab = this.Tab.One;

    this.citiesSub = this.calculatorService.getCitiesFrom()
      .pipe(
        map<CityFrom, Select>((cities: any) => {
          return cities
            .filter((city) => city.site_id !== Department.Aleutskaya && city.site_id !== Department.Gogolya)
            .map((city) => {
              this.formattedData[city.id] = city;
              return {value: city.id, name: city.name};
            });
        })
      )
      .subscribe((cities: any) => {
        this.cities = cities;
      });

    super.ngOnInit();
  }

  changeType(type: string) {
    switch (type) {
      case this.Tab.One:
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.One).setValidators([Validators.required]);
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.Two).clearValidators();
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.Two).setValue('');
        break;
      case this.Tab.Two:
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.Two).setValidators([Validators.required]);
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.One).clearValidators();
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.One).setValue('');
        break;
    }
  }

  setCity(id: string) {
    this.orderForm.cityFrom$.next(id);
    this.getTabs(id);
    this.getOffices(id);
  }

  getTabs(id: string) {
    this.tabsSub = this.calculatorService.getOffices()
      .pipe(
        map((offices: any) => {
          return offices.filter((office) => office.office_id === this.formattedData[id].office_id);
        }),
        concatAll(),
        first(),
        map((office: any) => {
          return Object.entries(office)
            .filter((item: [string, any]) => {
              return item[0] === 'give' && item[1] === '1' || item[0] === 'pickup' && item[1] === '1';
            })
            .map((item: [string, any]) => {
              return item[0];
            });
        })
      )
      .subscribe((tabs: string[]) => {
        if (tabs.length) {

          tabs.forEach((name: string) => {
            (this.formGroup.get(FormControlName.DispatchData) as FormGroup).addControl(name, new FormControl(''));
          });

          this.tabsReceived = true;
        }
      });
  }

  getOffices(id: string) {
    this.officesSub = this.calculatorService.getOffices()
      .pipe(
        map((offices: any) => {
          return offices
                  .filter((office) => office.office_id === this.formattedData[id].office_id)
                  .map((office) => {
                    return {value: office.id, name: office.address};
                  });
        })
      )
      .subscribe((offices: any) => {
        this.offices = offices;
      });
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
