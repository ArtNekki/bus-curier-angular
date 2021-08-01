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


  constructor(
    protected orderForm: OrderFormService,
    protected changeDetectorRef?: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  public onTouched: () => void = () => {};

  writeValue(value: any): void {
    if (value) {
      this.formGroup.setValue(value, { emitEvent: false });
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
        this.formGroup.markAllAsTouched();
      }

      if (isInvalid) {
        this.orderForm.setInvalidStep(result.step);
      } else {
        this.orderForm.setInvalidStep(null);
      }

    });
    return !isInvalid ? null : { invalidForm: {valid: false, message: 'invalid'}};
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // this.formGroup.markAsTouched();

    // if (this.changeDetectorRef) {
    //   this.changeDetectorRef.detectChanges();
    // }

    console.log('form touched', this.formGroup.touched);

    // if (this.formGroup.invalid && this.formGroup.touched) {
    //   this.formGroup.markAllAsTouched();
    // }
    // setTimeout(() => );
    console.log('touched', this.formGroup.touched);
  }

  // setDisabledState?(isDisabled: boolean): void {
  //   isDisabled ? this.parcelGroup.disable() : this.parcelGroup.enable();
  // }
}
