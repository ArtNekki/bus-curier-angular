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
import {map} from 'rxjs/operators';
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
  public Tab = {One: 'department', Two: 'courier'};
  public currentTab = null;

  public cities = [];
  public offices = [];
  public office: any;

  private citiesFromSub: Subscription;
  private officesSub: Subscription;

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
        [FormControlName.Department]: new FormControl('', [Validators.required]),
        [FormControlName.Courier]: new FormControl('')
      }, [Validators.required]),
      [FormControlName.Date]: new FormControl('', [Validators.required]),
    });

    this.currentTab = this.Tab.One;

    this.citiesFromSub = this.calculatorService.getCitiesFrom()
      .pipe(
        map<CityFrom, Select>((cities: any) => {
          return cities
            .filter((city) => city.site_id !== Department.Aleutskaya && city.site_id !== Department.Gogolya)
            .map((city) => ({value: city.id, name: city.name}));
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

    this.calculatorService.getOffices()
      .pipe(filter((item: Office) => item.office_id === id))
      .subscribe((result: Office) => {
        console.log('result', result);
      });
  }

  ngOnDestroy(): void {
    if (this.citiesFromSub) {
      this.citiesFromSub.unsubscribe();
    }
  }
}
