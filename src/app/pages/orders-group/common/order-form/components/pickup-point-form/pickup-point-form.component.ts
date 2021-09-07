import {Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
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
import {BehaviorSubject, Subscription} from 'rxjs';
import CargoType from '../../../../../../core/models/CargoType';
import {ActivatedRoute, Params} from '@angular/router';

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
export class PickupPointFormComponent extends SubFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cityFromId: string;

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

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private route: ActivatedRoute,
              private calcService: CalculatorService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl({value: '', disabled: false}, [Validators.required]),
      [FormControlName.Options]: new FormGroup({
        [FormControlName.Active]: new FormControl('', [Validators.required]),
      })
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.defaultCity = params.cityToId;
    });

    this.loadOffices();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.cityFromId && changes.cityFromId.currentValue)) {
      this.currentCityId = changes.cityFromId.currentValue;
      this.initLocation(changes.cityFromId.currentValue);
    }
  }

  initLocation(id: string) {
    this.citiesSub = this.calcService.getCityTo(id, 0)
      .pipe(
        map<CityTo, Select>((cities: any) => {
          return cities
            .map((city) => {
              this.cityData[city.id] = city;
              return {value: city.id, name: city.name};
            });
        })
      )
      .subscribe((cities: any) => {
        if (cities.length) {
          this.cities = [{value: '0', name: 'Выберите город'}, ...cities];

          setTimeout(() => {
            if (this.defaultCity) {
              this.formGroup.get(FormControlName.Location).setValue(this.defaultCity);
              this.setCity(this.defaultCity);
            } else {
              this.formGroup.get(FormControlName.Location).setValue(this.cities[0].value);
            }
          }, 0);

          this.clearOptions();
        }
      });
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
    this.onChangeCity.emit(id);
  }

  createTabs(id: string) {
    this.officesSub = this.getOfficesById(id)
      .pipe(
        map((offices: any) => {
          return offices
            .map((office) => {
              return {value: office.id, name: office.address, delivery: office.delivery};
            });
        })

      )
      .subscribe((offices: any) => {
        if (offices.length) {
          (this.formGroup.get(FormControlName.Options) as FormGroup).addControl(FormControlName.Get, new FormControl('', [Validators.required]));
          this.formGroup.get(FormControlName.Options).get(FormControlName.Active).setValue(FormControlName.Get);

          if (+offices[0].delivery) {
            (this.formGroup.get(FormControlName.Options) as FormGroup).addControl(FormControlName.Delivery, new FormControl(''));
          }

          this.departments = offices;
        } else {
          (this.formGroup.get(FormControlName.Options) as FormGroup).removeControl(FormControlName.Get);
          (this.formGroup.get(FormControlName.Options) as FormGroup).removeControl(FormControlName.Delivery);
        }
      });
  }

  createNeedToMeetControl(id) {
    if (this.cityData[id].need_to_meet !== '0') {
      (this.formGroup.get(FormControlName.Options) as FormGroup).addControl(FormControlName.NeedToMeet, new FormControl(true));

      const active = this.formGroup.get(FormControlName.Options).get(FormControlName.Active);

      if (!active.value) {
        active.setValue(FormControlName.NeedToMeet);
      }
    } else {
      (this.formGroup.get(FormControlName.Options) as FormGroup).removeControl(FormControlName.NeedToMeet);
    }
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

  clearOptions() {
    Object.entries((this.formGroup.get(FormControlName.Options) as FormGroup).controls)
      .forEach(([key, control]: [string, AbstractControl]) => {
        if (key !== FormControlName.Active) {
          (this.formGroup.get(FormControlName.Options) as FormGroup).removeControl(key);
        }
      });

  }

  setDisabledState?(isDisabled: boolean): void {
    this.isFormGroupDisabled = isDisabled;

    if (isDisabled) {
      // this.formGroup.get(FormControlName.Location).disable();
    } else {
      // this.formGroup.get(FormControlName.Location).enable();

      // setTimeout(() => {
      //   this.formGroup.get(FormControlName.Location).setValue(this.cities[0].value);
      // }, 0);
    }
  }

  // writeValue(value: any): void {
  //   if (value) {
  //     this.defaultCitySub = this.calcService.getCityTo(id, 0)
  //       .subscribe((cities) => {
  //         this.setCity(value.location);
  //         super.writeValue(value);
  //       });
  //   }
  // }

  writeValue(value: any): void {
    if (value) {
      this.defaultCitySub = this.calcService.getCityTo(this.currentCityId, 0)
        .subscribe((cities) => {
          this.setCity(value.location);
          super.writeValue(value);
          this.formGroup.reset(this.formGroup.value);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.citiesSub) {
      this.citiesSub.unsubscribe();
    }

    if (this.officesSub) {
      this.officesSub.unsubscribe();
    }

    if (this.departmentsSub) {
      this.departmentsSub.unsubscribe();
    }
  }
}
