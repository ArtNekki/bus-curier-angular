import {AfterViewInit, ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-basic-group',
  templateUrl: './basic-group.component.html',
  styleUrls: ['./basic-group.component.scss']
})
export class BasicGroupComponent implements OnInit, AfterViewInit, OnDestroy, Validator, ControlValueAccessor {
  public formGroup: FormGroup;
  public onChangeSub: Subscription;
  private subscriptions: Subscription[] = [];


  constructor(
    protected orderForm: OrderFormService,
    protected changeDetectorRef?: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe(value => {
        console.log('subscriptions', value);
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
      // this.onTouched();
    }

    if (value === null) {
      this.formGroup.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const values = Object.values(this.formGroup.controls);

    const isInvalid = values.some((value) => {
       return value.errors;
    });

    console.log('formIsInvalid', values);

    this.orderForm.formData$.subscribe((result: {submitted: boolean, step: number}) => {
      if (isInvalid) {

      }

      this.formGroup.markAllAsTouched();
      // this.formGroup.markAsDirty();
      // this.formGroup.markAsTouched();

      values.forEach((value) => {
        value.markAsDirty();
      });
      // this.formGroup.markAsDirty();

      if (isInvalid) {
        this.orderForm.setInvalidStep(result.step);
      } else {
        this.orderForm.setInvalidStep(null);
      }

    });
    return !isInvalid ? null : { invalidForm: {valid: false, message: 'invalid'}};
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

  ngAfterViewInit(): void {
    // this.formGroup.markAsTouched();

    // if (this.changeDetectorRef) {
    //   this.changeDetectorRef.detectChanges();
    // }

    // console.log('form touched', this.formGroup.touched);

    // if (this.formGroup.invalid && this.formGroup.touched) {
    //   this.formGroup.markAllAsTouched();
    // }
    // setTimeout(() => );
    // console.log('touched', this.formGroup.touched);
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  // }
}
