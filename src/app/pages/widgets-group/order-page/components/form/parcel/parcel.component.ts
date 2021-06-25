import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import formGroupMeta from '../../../../../../core/form/formGroupMeta';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParcelComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ParcelComponent),
      multi: true
    }
  ]
})
export class ParcelComponent implements OnInit, ControlValueAccessor, Validator {
  public formGroupMeta = formGroupMeta;
  public isInvalid = false;

  public parcelGroup = new FormGroup({
    [FormControlName.PlaceCount]: new FormControl('', [Validators.required]),
    [FormControlName.Weight]: new FormControl('', [Validators.required]),
    [FormControlName.Width]: new FormControl('', [Validators.required]),
    [FormControlName.Height]: new FormControl('', [Validators.required]),
    [FormControlName.Length]: new FormControl('', [Validators.required])
  });

  constructor(public formUtils: FormUtilsService) { }

  ngOnInit( ): void {
  }

  public onTouched: () => void = () => {};

  writeValue(val: any): void {
    if (val) {
      this.parcelGroup.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.parcelGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null{
    this.isInvalid = !this.parcelGroup.valid && this.parcelGroup.touched;

    return this.parcelGroup.valid ? null : { invalidForm: {valid: false, message: 'Control invalid'}};
  }
}
