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

  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      parcels: new FormArray([
        new FormGroup({
          count: new FormControl('', [Validators.required]),
          weight: new FormControl('', [Validators.required]),
          width: new FormControl('', [Validators.required]),
          height: new FormControl('', [Validators.required]),
          length: new FormControl('', [Validators.required])
        })
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

  writeValue(val: any): void {
    if (val) {
      this.parcels.clear();

      const parcel = new FormGroup({});

      val.forEach((item, i) => {
        for (const[key, value] of Object.entries(item)) {
          parcel.addControl(key, new FormControl(value, [Validators.required]));
        }

        this.parcels.push(parcel);
      });
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
}
