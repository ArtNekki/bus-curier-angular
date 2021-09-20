import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {SubFormComponent} from '../sub-form/sub-form.component';
import formGroupMeta from 'src/app/core/form/formGroupMeta';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';

@Component({
  selector: 'app-parcel-form',
  templateUrl: './parcel-form.component.html',
  styleUrls: ['./parcel-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParcelFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ParcelFormComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcelFormComponent extends SubFormComponent implements OnInit {
  public FormFieldMeta = formFieldMeta;
  public isInvalid = false;

  public formGroup: FormGroup;

  constructor(
    public formUtils: FormUtilsService,
    orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.PlaceCount]:
        new FormControl(1, [Validators.required, Validators.min(1)]),
      [FormControlName.Weight]:
        new FormControl( '', [Validators.required, Validators.min(1)]),
      [FormControlName.Width]:
        new FormControl( '', [Validators.required, Validators.min(1)]),
      [FormControlName.Height]:
        new FormControl( '', [Validators.required, Validators.min(1)]),
      [FormControlName.Length]:
        new FormControl( '', [Validators.required, Validators.min(1)])
    });

    this.formGroup.markAllAsTouched();
    this.formGroup.markAsTouched();
    this.onTouched();

    super.ngOnInit();
  }
}
