import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import FormControlName from 'src/app/core/maps/FormControlName';
import schedule from 'src/app/mock-data/schedule';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourierComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CourierComponent),
      multi: true
    }
  ]
})
export class CourierComponent extends BasicGroupComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public schedule = schedule;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Street]: new FormControl('', [Validators.required]),
      [FormControlName.Building]: new FormControl('', [Validators.required]),
      [FormControlName.Apartment]: new FormControl('', [Validators.required]),
      [FormControlName.CourierTime]: new FormControl('time-1', [])
    });

    super.ngOnInit();
  }
}
