import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator} from '@angular/forms';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

@Component({
  selector: 'app-sub-form',
  templateUrl: './sub-form.component.html',
  styleUrls: ['./sub-form.component.scss']
})
export class SubFormComponent implements OnInit, OnDestroy, Validator, ControlValueAccessor {

  public formSub: Subscription;
  public formGroup: FormGroup;

  public onChangeSub: Subscription;
  private subscriptions: Subscription[] = [];

  public form$ = new Subject();

  constructor(
    protected orderForm: OrderFormService,
    // protected changeDetectorRef?: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );

    this.formSub = this.orderForm.$form.subscribe((data: FormGroup) => {

      if (data) {
        this.form$.next(data);
      }
    });
  }

  public onTouched: () => void = () => {};
  public onChange: any = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
      this.onChange(value);
      this.onTouched();
    }

    // if (value === null) {
    //   this.formGroup.reset();
    // }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    // this.formGroup.markAllAsTouched();
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

    if (this.formSub) {
      this.formSub.unsubscribe();
    }

  }

  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  // }
}
