import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {map} from 'rxjs/operators';
import cities from 'src/app/mock-data/cities';

@Component({
  selector: 'app-auto-parts',
  templateUrl: './auto-parts.component.html',
  styleUrls: ['./auto-parts.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoPartsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutoPartsComponent),
      multi: true
    }
  ]
})
export class AutoPartsComponent implements OnInit, ControlValueAccessor, Validator {
  public formGroup: FormGroup;
  public cities = cities;

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      parts: new FormArray([
        new FormControl('')
      ])
    });
  }

  public get parts(): FormArray {
    return this.formGroup.get('parts') as FormArray;
  }

  addAutoPart() {
    this.parts.push(new FormControl(''));
  }

  removeAutoPart(index: number) {
    if (this.parts.length <= 1) {
      return;
    }

    this.parts.removeAt(index);
  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.parts.clear();
      value.forEach(item => this.parts.push(new FormControl(item)));
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.pipe( map(value => value.parts)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  // }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'auto-parts are invalid'}};
  }
}
