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
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {BasicGroupComponent} from '../basic-group/basic-group.component';

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
export class ParcelComponent extends BasicGroupComponent implements OnInit {
  public formGroupMeta = formGroupMeta;
  public isInvalid = false;

  public formGroup = new FormGroup({
    [FormControlName.PlaceCount]: new FormControl('', [Validators.required]),
    [FormControlName.Weight]: new FormControl('', [Validators.required]),
    [FormControlName.Width]: new FormControl('', [Validators.required]),
    [FormControlName.Height]: new FormControl('', [Validators.required]),
    [FormControlName.Length]: new FormControl('', [Validators.required])
  });

  constructor(
    public formUtils: FormUtilsService,
    orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit( ): void {
  }
}
