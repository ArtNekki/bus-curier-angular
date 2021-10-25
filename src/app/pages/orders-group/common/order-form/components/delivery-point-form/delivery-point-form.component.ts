import {Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import addressPoints from 'src/app/mock-data/address-points';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {combineAll, delay, map, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Subscription, zip} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {CityTo} from '../../../../../../core/interfaces/calculator';
import {Select} from '../../../../../../core/interfaces/form';
import {LocalStorageService} from '../../../../../../core/services/local-storage.service';

@Component({
  selector: 'app-delivery-point-form',
  templateUrl: './delivery-point-form.component.html',
  styleUrls: ['./delivery-point-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeliveryPointFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DeliveryPointFormComponent),
      multi: true
    }
  ]
})
export class DeliveryPointFormComponent extends SubFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cityFromId: string;
  @Input() noLabel: boolean;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;

  public TabName = {
    get: 'Забрать в отделении',
    delivery: 'Вызвать курьера',
    'need-to-meet': 'Встретить с автобуса'
  };

  public isFormGroupDisabled = false;

  private defaultCity: string;
  private defaultCitySub: Subscription;

  public cities = [];
  public departments = [];
  public cityData = {};

  private currentCityId = null;

  private citiesSub: Subscription;
  private departmentsSub: Subscription;

  public offices$ = new BehaviorSubject([]);
  private officesSub: Subscription;
  private officesByIdSub: Subscription;


  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private route: ActivatedRoute,
              private localStorage: LocalStorageService,
              private calcService: CalculatorService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl({value: '', disabled: false}, [Validators.required]),
      [FormControlName.Options]: new FormGroup({
        [FormControlName.Active]: new FormControl('', [Validators.required]),
      })
    });

    this.loadOffices();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.cityFromId && changes.cityFromId.currentValue)) {
      this.currentCityId = changes.cityFromId.currentValue;
    }
  }

  get options() {
    return this.formGroup.get(FormControlName.Options) as FormGroup;
  }

  loadCities(id) {
    return this.calcService.getCityTo(id, 0)
      .pipe(
        tap((cities) => {
          this.localStorage.set('cities', cities);
        }),
        map<CityTo, Select>((cities: any) => {
          return cities
            .map((city) => {
              this.cityData[city.id] = city;
              return {value: city.id, name: city.name};
          });
        }),
        map((cities: any) => {
          const sorted = cities.sort((a: Select, b: Select) => {
            return a.name.localeCompare(b.name);
          });

          return [{value: '', name: 'Выберите город'}, ...sorted];
        }),
        tap((cities: any) => {
          this.cities = cities;
        }),
        delay(0)
    );
  }

  loadOffices() {
    this.officesSub = this.calcService.getOffices()
      .subscribe((arr: any) => {
        this.offices$.next(arr);
      });
  }

  getOfficesById(id) {
    return this.offices$
      .pipe(
        map((offices: any) => {
          return offices.filter((office) => office.office_id === this.cityData[id].office_id);
        })
      );
  }

  setCity(id: string) {
    this.createTabs(id);
    this.createNeedToMeetControl(id);
  }

  createTabs(id: string) {
    this.officesByIdSub = this.getOfficesById(id)
      .pipe(
        map((offices: any) => {
          return offices
            .map((office) => {
              return {value: office.home_id || office.id, name: office.address, delivery: office.delivery};
            });
        })

      )
      .subscribe((offices: any) => {
        if (offices.length) {
          this.options.addControl(FormControlName.Get, new FormControl('', [Validators.required]));
          this.options.get(FormControlName.Active).setValue(FormControlName.Get);

          if (+offices[0].delivery) {
            this.options.addControl(FormControlName.Delivery, new FormControl(''));
          }

          this.departments = offices;
        } else {
          this.options.removeControl(FormControlName.Get);
          this.options.removeControl(FormControlName.Delivery);
        }
      });
  }

  createNeedToMeetControl(id) {
    if (this.cityData[id].need_to_meet !== '0') {
      this.options.addControl(FormControlName.NeedToMeet, new FormControl(''));

      const active = this.options.get(FormControlName.Active);

      if (this.findControl(FormControlName.NeedToMeet) && !this.findControl(FormControlName.Get)) {
        active.setValue(FormControlName.NeedToMeet);
      }

    } else {
      this.options.removeControl(FormControlName.NeedToMeet);
    }
  }

  changeType(type: string) {
    Object.entries(this.options.controls)
      .forEach(([key, control]: [string, AbstractControl]) => {
        if (key !== FormControlName.Active) {
          control.clearValidators();
          control.setValue('');
        }
      });

    this.options.get(type).setValidators([Validators.required]);
  }

  clearOptions() {
    Object.entries(this.options.controls)
      .forEach(([key, control]: [string, AbstractControl]) => {
        if (key !== FormControlName.Active) {
          this.options.removeControl(key);
        }
      });

  }

  // getControlsAmount(data) {
  //   return Object.values(data).length;
  // }

  findControl(name) {
    return Object.keys(this.options.controls).indexOf(name) !== -1;
  }

  setDisabledState?(isDisabled: boolean): void {

    if (isDisabled) {
      // this.formGroup.get(FormControlName.Location).disable();
    } else {
      // this.formGroup.get(FormControlName.Location).enable();
    }
  }

  writeValue(value: any): void {
    combineLatest(
      this.route.queryParams,
      this.calcService.cityFromId$)
      .pipe(delay(0))
      .subscribe(([params, id]) => {
        const cityFromId = params.cityFromId || id;
        const cityToId = params.cityToId || (value && value.location);

        if (!cityFromId) {
          return;
        }

        this.loadCities(cityFromId)
          .pipe(delay(0))
          .subscribe((cities: any) => {
            if (cityToId) {
              this.formGroup.get(FormControlName.Location).setValue(cityToId);
              this.setCity(cityToId);
            } else {
              this.formGroup.get(FormControlName.Location).setValue(cities[0].value);
            }

            this.formGroup.get(FormControlName.Location).markAsTouched();
            super.writeValue(value);
            this.clearOptions();
          });
      });
  }

  ngOnDestroy(): void {
    if (this.citiesSub) {
      this.citiesSub.unsubscribe();
    }

    if (this.officesSub) {
      this.officesSub.unsubscribe();
    }

    if (this.officesByIdSub) {
      this.officesByIdSub.unsubscribe();
    }

    if (this.departmentsSub) {
      this.departmentsSub.unsubscribe();
    }

    if (this.defaultCitySub) {
      this.defaultCitySub.unsubscribe();
    }
  }
}
