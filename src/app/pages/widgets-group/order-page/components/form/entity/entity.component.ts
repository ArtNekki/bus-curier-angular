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
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntityComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EntityComponent),
      multi: true
    }
  ]
})
export class EntityComponent extends BasicGroupComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.CompanyName]: new FormControl('', [Validators.required]),
      [FormControlName.Address]: new FormControl('', [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required]),
    });

    super.ngOnInit();
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
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'individual group are invalid'}};
  }
}
