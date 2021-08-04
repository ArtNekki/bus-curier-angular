import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
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
import fadeIn from '../../../../../../core/animations/fadeIn';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.scss'],
  animations: [fadeIn],
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
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CargoComponent extends BasicGroupComponent implements OnInit {
  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentCargoType = null;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private cdr: ChangeDetectorRef,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      activeItem: new FormControl(FormControlName.Docs),
      items: new FormGroup({
        [FormControlName.Docs]: new FormControl(''),
        [FormControlName.Parcels]: new FormControl(''),
        [FormControlName.AutoParts]: new FormControl(''),
        // other: new FormGroup({})
      })
    });

    this.formGroup.markAllAsTouched();

    super.ngOnInit();
    // console.log("this.formGroup.get('activeItem').value", this.formGroup.get('activeItem').value);
    // this.changeCargoType(this.formGroup.get('activeItem').value);

    // setTimeout(() => {
    //   this.changeCargoType(this.formGroup.get('activeItem').value);
    //   this.changeDetectorRef.detectChanges();
    // }, 0);
  }

  get cargo() {
    return this.formGroup.get(FormControlName.Cargo) as FormArray;
  }

  changeCargoType(type: string) {
    switch (type) {
      case FormControlName.Docs:
        // this.formGroup.get('items').get(FormControlName.Docs).setValidators([Validators.required]);
        this.formGroup.get('items').get(FormControlName.Parcels).setValue('');
        // this.formGroup.get('items').get(FormControlName.Parcels).clearValidators();
        this.formGroup.get('items').get(FormControlName.AutoParts).setValue('');
        // this.formGroup.get('items').get(FormControlName.AutoParts).clearValidators();
        break;
      case FormControlName.Parcels:
        // this.formGroup.get('items').get(FormControlName.Parcels).setValidators([Validators.required]);
        this.formGroup.get('items').get(FormControlName.Docs).setValue('');
        // this.formGroup.get('items').get(FormControlName.Docs).clearValidators();
        this.formGroup.get('items').get(FormControlName.AutoParts).setValue('');
        // this.formGroup.get('items').get(FormControlName.AutoParts).clearValidators();
        break;
      case FormControlName.AutoParts:
        // this.formGroup.get('items').get(FormControlName.AutoParts).setValidators([Validators.required]);
        this.formGroup.get('items').get(FormControlName.Parcels).setValue('');
        // this.formGroup.get('items').get(FormControlName.Parcels).clearValidators();
        // this.formGroup.get('items').get(FormControlName.Docs).clearValidators();
        this.formGroup.get('items').get(FormControlName.Docs).setValue('');
        break;
    }

    // this.formGroup.markAllAsTouched();
    // this.formGroup.markAsTouched();
    // this.onTouched();
    // this.cdr.detectChanges();
  }
}
