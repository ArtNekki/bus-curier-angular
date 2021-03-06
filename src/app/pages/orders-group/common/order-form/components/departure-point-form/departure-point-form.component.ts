import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import addressPoints from 'src/app/mock-data/address-points';
import FormControlName from 'src/app/core/maps/FormControlName';
import { SubFormComponent } from '../sub-form/sub-form.component';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {BehaviorSubject, Observable, PartialObserver, Subject, Subscription} from 'rxjs';
import {concatAll, debounceTime, delay, first, map, pairwise, take, tap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {CityFrom} from '../../../../../../core/interfaces/calculator';
import {Select} from '../../../../../../core/interfaces/form';
import {VLOffice} from '../../../../../../core/maps/calculator';

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

  public TabName = {
    give: 'C???????? ?? ??????????????????',
    pickup: '?????????????? ??????????????'
  };

  public dataLoading = false;

  private defaultCity: string;

  public cities = [];
  public departments = [];
  public offices$ = new BehaviorSubject([]);
  public cityData = {};

  private initSub: Subscription;
  private officesSub: Subscription;
  private departmentsSub: Subscription;
  private tabsSub: Subscription;
  private defaultCitySub: Subscription;
  private routeSub: Subscription;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calculatorService: CalculatorService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl('', [Validators.required]),
      [FormControlName.Options]: new FormGroup({
        [FormControlName.Active]: new FormControl('', [Validators.required]),
      }, [Validators.required]),
      [FormControlName.Date]: new FormControl('', [Validators.required]),
    });

    this.loadOffices();
    this.setDate();

    super.ngOnInit();

    this.formGroup.get(FormControlName.Location).valueChanges
      .pipe(
        debounceTime(100),
        pairwise()
      )
      .subscribe(([prevId, nextId]) => {

        if (prevId !== nextId) {
          this.setTabs(nextId);
        }

      });
  }

  get options() {
    return this.formGroup.get(FormControlName.Options) as FormGroup;
  }

  loadCities() {
    return this.calculatorService.getCitiesFrom()
      .pipe(
        tap((cities: any) => {
          cities.forEach((city) => {
            this.cityData[city.id] = city;
          });
        }),
        map((cities: any) => {
          return cities
            .filter((city) => city.id !== VLOffice.Aleutskaya && city.id !== VLOffice.Gogolya);
        })
      );
  }

  loadOffices() {
    this.officesSub = this.calculatorService.getOffices()
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

  init(cityId) {
    return this.loadCities()
      .pipe(
        map<CityFrom, Select>((cities: any) => {
          return cities
            .map((city) => {

              if ((cityId === VLOffice.Rus || cityId === VLOffice.Gogolya
                || cityId === VLOffice.Aleutskaya) && city.site_id === '1') {
                city.id = cityId;
              }

              return {value: city.id, name: city.name};
            });
        }),
        map((cities: any) => {
          const sorted = cities.sort((a: Select, b: Select) => {
            return a.name.localeCompare(b.name);
          });

          return [{value: '', name: '???????????????? ??????????'}, ...sorted];
        }),
        tap((cities: any) => {
          this.cities = cities;
        })
      );
  }

  setDate() {
    this.formGroup.get(FormControlName.Date).setValue(new Intl.DateTimeFormat('ru-Ru').format(new Date()));
    this.formGroup.get(FormControlName.Date).markAsDirty();
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

    if (type === FormControlName.Pickup) {
      this.calculatorService.courierDelivery$.next(type);
    }
  }

  setTabs(id: string) {
    this.getOfficesById(id)
      .pipe(
        take(1),
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
              this.options.addControl(name, new FormControl(''));
            });

            this.options.get(FormControlName.Active).setValue(tabs[0]);
          }
        },
        () => {},
        () => {
          const departmentControl = this.options.get(FormControlName.Give);

          if (departmentControl) {
            departmentControl.valueChanges
              .subscribe((data) => {
                if (data.office === VLOffice.Rus
                  || data.office === VLOffice.Aleutskaya || data.office === VLOffice.Gogolya) {
                  this.formGroup.get(FormControlName.Location).setValue(data.office);
                }
              });

            this.getDepartments(id);
          }
        });
  }

  getDepartments(id: string) {
    this.getOfficesById(id)
      .pipe(
        take(1),
        map((offices: any) => {
          return offices
            .filter((office) => +office.give)
            .map((office) => {
              return {value: office.home_id || office.office_id, name: office.address};
            });
        })
      )
      .subscribe((offices: any) => {
        this.departments = offices;
      });
  }

  writeValue(value: any): void {

    this.routeSub = this.route.queryParams
      .subscribe((params: Params) => {

        const cityId = params.cityFromId || (value && value.location);

        this.initSub = this.init(cityId)
          .pipe(delay(0))
          .subscribe((cities: any) => {
            if (cityId) {
              this.formGroup.get(FormControlName.Location).setValue(cityId);
              this.setTabs(cityId);
            } else {
              this.formGroup.get(FormControlName.Location).setValue(cities[0].value);
            }

            super.writeValue(value);
          });
      });
  }

  ngOnDestroy(): void {
    if (this.initSub) {
      this.initSub.unsubscribe();
    }

    if (this.officesSub) {
      this.officesSub.unsubscribe();
    }

    if (this.tabsSub) {
      this.tabsSub.unsubscribe();
    }

    if (this.departmentsSub) {
      this.departmentsSub.unsubscribe();
    }

    if (this.defaultCitySub) {
      this.defaultCitySub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
