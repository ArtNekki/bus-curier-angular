import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator} from '@angular/forms';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.scss']
})
export class SubFormComponent implements OnInit, OnDestroy, Validator, ControlValueAccessor {

  public formGroup: FormGroup;

  public onChangeSub: Subscription;
  private subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public onTouched: () => void = () => {};
  public onChange: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
      this.onChange(value);
      this.onTouched();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    this.formGroup.markAsDirty();
    this.formGroup.markAsTouched();

    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'invalid'}};
  }

  ngOnDestroy(): void {

    if (this.onChangeSub) {
      this.onChangeSub.unsubscribe();
    }

    if (this.subscriptions.length) {
      console.log('this.subscriptions.length', this.subscriptions.length);
      // this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  // }
}
