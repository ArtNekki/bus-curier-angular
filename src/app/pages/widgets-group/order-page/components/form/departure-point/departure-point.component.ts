import {Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, Validators
} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import addressPoints from 'src/app/mock-data/address-points';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

@Component({
  selector: 'app-departure-point',
  templateUrl: './departure-point.component.html',
  styleUrls: ['./departure-point.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeparturePointComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DeparturePointComponent),
      multi: true
    }
  ]
})
export class DeparturePointComponent extends BasicGroupComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;
  public Tab = {One: 'department', Two: 'courier'};
  public currentTab = null;

  public cities = [];

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calculatorService: CalculatorService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Location]: new FormControl('', [Validators.required]),
      [FormControlName.DispatchData]: new FormGroup({
        [FormControlName.Active]: new FormControl('', [Validators.required]),
        [FormControlName.Department]: new FormControl(''),
        [FormControlName.Courier]: new FormControl('')
      }),
      [FormControlName.Date]: new FormControl('', [Validators.required]),
    });

    this.currentTab = this.Tab.One;

    this.calculatorService.getDistricts(1).subscribe((result: Array<{id: string, name: string}>) => {
      this.cities = result.map((el: {id: string, name: string}) => {
        return {value: el.id, name: el.name};
      });
    });

    super.ngOnInit();
  }

  changeType(type: string) {
    switch (type) {
      case this.Tab.One:
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.Two).setValue('');
        break;
      case this.Tab.Two:
        this.formGroup.get(FormControlName.DispatchData).get(this.Tab.One).setValue('');
        break;
    }
  }
}
