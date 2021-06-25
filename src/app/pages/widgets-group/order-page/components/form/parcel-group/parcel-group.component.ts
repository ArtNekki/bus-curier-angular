import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator, Validators
} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {map, tap} from 'rxjs/operators';
import formGroupMeta from '../../../../../../core/form/formGroupMeta';
import FormControlName from '../../../../../../core/maps/FormControlName';
import fieldError from '../../../../../../core/form/fieldError';
import {parcelGroup} from '../../../../../../core/form/groups';

@Component({
  selector: 'app-parcel-group',
  templateUrl: './parcel-group.component.html',
  styleUrls: ['./parcel-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParcelGroupComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ParcelGroupComponent),
      multi: true
    }
  ]
})
export class ParcelGroupComponent implements OnInit, ControlValueAccessor, Validator {
  public FormFieldError = fieldError;

  public form: FormGroup;
  public formGroupMeta = formGroupMeta;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      parcels: new FormArray([
        new FormControl('')
      ])
    });
  }

  public get parcels(): FormArray {
    return this.form.get('parcels') as FormArray;
  }

  getGroupControls(group) {
    return (group as FormGroup).controls;
  }

  originalOrder = (a: KeyValue<string, AbstractControl>, b: KeyValue<string, AbstractControl>): number => {
    return 0;
  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.parcels.clear();
      value.forEach(item => this.parcels.push(new FormControl(item)));
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.pipe( map(value => value.parcels)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    console.log("Basic Info validation", c);
    return this.form.valid ? null : { invalidForm: {valid: false, message: "basicInfoForm fields are invalid"}};
  }

  getObjectKey(object) {
    return (object instanceof Object) && Object.keys(object);
  }

  addParcelParams() {
    this.parcels.push(new FormControl(''));
  }

  deleteParcelParams(index: number) {
    if (this.parcels.length <= 1) {
      return;
    }

    this.parcels.removeAt(index);
  }
}
