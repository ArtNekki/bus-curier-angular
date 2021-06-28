import {ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../../core/form/fieldError';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import roles from 'src/app/mock-data/roles';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IndividualComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IndividualComponent),
      multi: true
    }
  ]
})
export class IndividualComponent implements OnInit, ControlValueAccessor, Validator {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public roles = roles;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private orderForm: OrderFormService,
              private readonly cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.LastName]: new FormControl('', [Validators.required]),
      [FormControlName.FirstName]: new FormControl('', [Validators.required]),
      [FormControlName.MiddleName]: new FormControl('', [Validators.required]),
      [FormControlName.Email]: new FormControl('', [Validators.required, Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required]),
      [FormControlName.Role]: new FormControl('', [Validators.required]),
    });

    roles.unshift({value: '', name: 'Не выбрано'});
    this.roles = roles;
  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
    }
    // this.cdr.detectChanges();
    // this.cdr.markForCheck();
    // this.formGroup.markAllAsTouched();
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
