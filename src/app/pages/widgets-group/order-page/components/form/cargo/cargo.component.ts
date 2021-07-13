import {AfterViewChecked, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CargoComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CargoComponent),
      multi: true
    }
  ]
})
export class CargoComponent implements OnInit, ControlValueAccessor, Validator {
  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentCargoType = null;

  constructor(public formUtils: FormUtilsService,
              private orderForm: OrderFormService,
              public utils: UtilsService,
              private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      activeItem: new FormControl('docs'),
      items: new FormGroup({
        [FormControlName.Docs]: new FormControl(''),
        [FormControlName.Parcels]: new FormControl(''),
        [FormControlName.AutoParts]: new FormControl(''),
        // other: new FormGroup({})
      })
    });
  }

  get cargo() {
    return this.formGroup.get(FormControlName.Cargo) as FormArray;
  }

  changeCargoType(type: string) {
    switch (type) {
      case FormControlName.Docs:
        this.formGroup.get('items')
          .get(FormControlName.Parcels)
          .patchValue('', {
            onlySelf: true
          });
        this.formGroup.get('items')
          .get(FormControlName.AutoParts)
          .patchValue('', {
            onlySelf: true
          });
        break;
      case FormControlName.Parcels:
        this.formGroup.get('items')
          .get(FormControlName.Docs)
          .patchValue('', {
          onlySelf: true
        });
        this.formGroup.get('items')
          .get(FormControlName.AutoParts)
          .patchValue('', {
          onlySelf: true
        });
        break;
      case FormControlName.AutoParts:
        this.formGroup.get('items')
          .get(FormControlName.Parcels)
          .patchValue('', {
            onlySelf: true
          });
        this.formGroup.get('items')
          .get(FormControlName.Docs)
          .patchValue('', {
            onlySelf: true
          });
        break;
    }
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
    this.orderForm.formData$.subscribe((result: {submitted: boolean, step: number}) => {
      if (c.errors) {
        this.formGroup.markAllAsTouched();
      }

      if (c.errors) {
        this.orderForm.setInvalidStep(result.step);
      } else {
        this.orderForm.setInvalidStep(null);
      }

    });

    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: 'cargo are invalid'}};
  }
}
