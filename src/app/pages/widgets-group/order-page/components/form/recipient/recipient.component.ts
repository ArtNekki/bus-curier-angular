import {Component, forwardRef, OnInit} from '@angular/core';
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
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import fieldError from '../../../../../../core/form/fieldError';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecipientComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RecipientComponent),
      multi: true
    }
  ]
})
export class RecipientComponent implements OnInit, ControlValueAccessor, Validator {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup: FormGroup;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Fio]: new FormControl('', [Validators.required]),
      [FormControlName.Tel]: new FormControl('', [Validators.required])
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
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'recipient are invalid'}};
  }
}
