import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
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
import formGroupMeta from '../../../../../../core/form/formGroupMeta';
import FormControlName from '../../../../../../core/maps/FormControlName';
import fieldError from '../../../../../../core/form/fieldError';
import {parcelGroup} from '../../../../../../core/form/groups';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {BasicGroupComponent} from '../basic-group/basic-group.component';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParcelGroupComponent extends BasicGroupComponent implements OnInit {
  public FormFieldError = fieldError;

  public formGroup: FormGroup;
  public formGroupMeta = formGroupMeta;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      parcels: new FormArray([
        new FormControl('')
      ])
    });

    super.ngOnInit();
  }

  public get parcels(): FormArray {
    return this.formGroup.get('parcels') as FormArray;
  }

  getGroupControls(group) {
    return (group as FormGroup).controls;
  }

  writeValue(value: any): void {
    if (value) {
      this.parcels.clear();
      value.forEach(item => this.parcels.push(new FormControl(item)));
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.pipe( map(value => value.parcels)).subscribe(fn);
  }

  add() {
    this.parcels.push(new FormControl(''));
  }

  delete(index: number) {
    if (this.parcels.length <= 1) {
      return;
    }

    this.parcels.removeAt(index);
  }
}
