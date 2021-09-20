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
import FormControlName from '../../../../../core/maps/FormControlName';
import {FormUtilsService} from '../../../../../core/services/form-utils.service';
import formFieldMeta from '../../../../../core/form/formFieldMeta';
import fieldError from '../../../../../core/form/fieldError';
import {UtilsService} from '../../../../../core/services/utils.service';
import fadeIn from '../../../../../core/animations/fadeIn';

@Component({
  selector: 'app-proxy-man',
  templateUrl: './proxy-man.component.html',
  styleUrls: ['./proxy-man.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProxyManComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProxyManComponent),
      multi: true
    }
  ]
})
export class ProxyManComponent implements OnInit, ControlValueAccessor, Validator {
  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;
  public FormFieldError = fieldError;

  public formGroup = new FormGroup({
    [FormControlName.Fio]: new FormControl('', [Validators.required]),
    [FormControlName.Tel]: new FormControl('', [Validators.required]),
    [FormControlName.ProxyNumber]: new FormControl('', [Validators.required])
  });

  constructor(
    public utils: UtilsService,
    public formUtils: FormUtilsService) { }

  ngOnInit( ): void {
  }

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val) {
      this.formGroup.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null{
    // this.isInvalid = !this.parcelGroup.valid && this.parcelGroup.touched;
    //
    // return this.parcelGroup.valid ? null : { invalidForm: {valid: false, message: 'Control invalid'}};

    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'department point are invalid'}};
  }
}
