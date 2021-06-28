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
export class CourierComponent implements OnInit, ControlValueAccessor, Validator {

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public schedule = schedule;

  constructor(public formUtils: FormUtilsService,
              private orderForm: OrderFormService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Street]: new FormControl('', [Validators.required]),
      [FormControlName.Building]: new FormControl('', [Validators.required]),
      [FormControlName.Apartment]: new FormControl('', [Validators.required]),
      [FormControlName.CourierTime]: new FormControl('time-1', [])
    });
  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    this.orderForm.formData$.subscribe((result: {submitted: boolean, step: number}) => {
      if (c.errors) {
        this.formGroup.markAllAsTouched();
      }

      if (c.errors) {
        this.orderForm.setInvalidStep(result.step);
      } else {
        this.orderForm.setInvalidStep(null);
      }

    });

    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'department point are invalid'}};
  }
}
