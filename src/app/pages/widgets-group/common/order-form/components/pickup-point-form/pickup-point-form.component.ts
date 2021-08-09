import {Component, forwardRef, Input, OnInit} from '@angular/core';
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
export class PickupPointFormComponent extends SubFormComponent implements OnInit {
  @Input() noLabel: boolean;

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public addressPoints = addressPoints;
  public Tab = {One: 'department', Two: 'courier'};

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
      [FormControlName.ReceiveData]: new FormGroup({
        [FormControlName.Active]: new FormControl('', [Validators.required]),
        [FormControlName.Department]: new FormControl('', [Validators.required]),
        [FormControlName.Courier]: new FormControl('')
      })
    });

    this.calculatorService.getDistricts(1).subscribe((result: Array<{id: string, name: string}>) => {
      this.cities = result.map((el: {id: string, name: string}) => {
        return {value: el.id, name: el.name};
      });
    });
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
}
