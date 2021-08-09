import {ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import fadeIn from '../../../../../../core/animations/fadeIn';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CargoFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CargoFormComponent),
      multi: true
    }
  ],
})
export class CargoFormComponent extends SubFormComponent implements OnInit  {
  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentCargoType = null;
  public isOk = false;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private cdr: ChangeDetectorRef,
              private simpleModal: SimpleModalService,
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
  }

  get cargo() {
    return this.formGroup.get(FormControlName.Cargo) as FormArray;
  }

  setCargoType(e, type: string) {

    if (!e.preventDefault) {
      return;
    }

    this.confirm().subscribe((result) => {

      if (!result) {
        return;
      }

      this.changeCargoType(type);

    });

    // this.formGroup.markAllAsTouched();
    // this.formGroup.markAsTouched();
    // this.onTouched();
    // this.cdr.detectChanges();
  }

  changeCargoType(type: string) {
    this.formGroup.get('activeItem').patchValue(type, {onlySelf: true});

    setTimeout(() => {

      switch (type) {
        case FormControlName.Docs:
          this.formGroup.get('items')
            .get(FormControlName.Parcels)
            .patchValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(FormControlName.AutoParts)
            .patchValue('', {onlySelf: true});
          break;
        case FormControlName.Parcels:
          this.formGroup.get('items')
            .get(FormControlName.Docs)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(FormControlName.AutoParts)
            .setValue('', {onlySelf: true});
          break;
        case FormControlName.AutoParts:
          this.formGroup
            .get('items').get(FormControlName.Parcels)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(FormControlName.Docs)
            .setValue('', {onlySelf: true});
          break;
      }

    }, 0);
  }

  confirm() {
    return this.simpleModal.addModal(ConfirmModalComponent, {
      message: `Вы уверены? <br /> Данные этого груза будут потеряны.`
    });
  }
}
