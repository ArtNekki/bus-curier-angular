import {Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
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
import {concatAll, first, map, take, tap} from 'rxjs/operators';
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
  @Output() onChangeCity: EventEmitter<string> = new EventEmitter<string>();
  @Input() noLabel: boolean;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;


  public Tab = {One: 'give', Two: 'pickup'};
  public TabName = {
    give: 'Cдать в отделение',
    pickup: 'Вызвать курьера'
  };
  public currentTab = null;

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
              private calculatorService: CalculatorService,
              protected orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl('', [Validators.required]),
      [FormControlName.Options]: new FormGroup({
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
              this.cityData[city.id] = city;
              return {value: city.id, name: city.name};
            });
        })
      )
      .subscribe((cities: any) => {
        this.cities = [{value: '0', name: 'Выберите город'}, ...cities];

        setTimeout(() => {
          this.formGroup.get(FormControlName.Location).setValue(this.cities[0].value);
        }, 0);
      });

    super.ngOnInit();
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
    this.orderForm.cityFrom$.next(id);
    this.getTabs(id);
    this.getOffices(id);
    this.dataLoading = true;
    this.onChangeCity.emit(id);
  }

  getTabs(id: string) {
    this.tabsSub = this.calculatorService.getOffices()
      .pipe(
        map((offices: any) => {
          return offices.filter((office) => office.office_id === this.cityData[id].office_id);
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
            (this.formGroup.get(FormControlName.Options) as FormGroup).addControl(name, new FormControl(''));
          });

          this.formGroup.get(FormControlName.Options).get(FormControlName.Active).setValue(tabs[0]);

          this.tabsReceived = true;
          this.dataLoading = false;
        }
      });
  }

  getOffices(id: string) {
    this.officesSub = this.calculatorService.getOffices()
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