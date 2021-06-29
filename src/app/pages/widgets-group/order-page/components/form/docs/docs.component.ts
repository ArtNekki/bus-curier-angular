import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, Validators
} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DocsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DocsComponent),
      multi: true
    }
  ]
})
export class DocsComponent implements OnInit, ControlValueAccessor, Validator {
  public FormControlName = FormControlName;
  public formGroup: FormGroup;

  constructor(private orderForm: OrderFormService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.PlaceCount]: new FormControl('', [Validators.required, Validators.min(1)])
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
