import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import fadeIn from '../../../../../../core/animations/fadeIn';
import CargoType from '../../../../../../core/models/CargoType';
import Select from '../../../../../../core/models/Select';
import {Subscription} from 'rxjs';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {delay} from 'rxjs/operators';

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
  ]
})
export class CargoFormComponent extends SubFormComponent implements OnInit  {
  public Cargo = {
    Docs: '1',
    Parcels: '2',
    AutoParts: '5',
    Other: '21'
  };

  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public formGroup: FormGroup;
  public currentCargoType = null;
  // public items: Array<Select> = [];
  public itemsSub: Subscription;
  public isOk = false;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private cdr: ChangeDetectorRef,
              private calcService: CalculatorService,
              private simpleModal: SimpleModalService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      activeItem: new FormControl(this.Cargo.Docs),
      items: new FormGroup({}, [Validators.required])
    });

    super.ngOnInit();

    this.itemsSub = this.calcService.getTypes(1, 1)
      .pipe(delay(500))
      .subscribe((result: Array<CargoType>) => {
        if (result.length) {

          result.forEach((item: CargoType) => {
            if (item.parent_id === '0') {
              this.items.addControl(item.id, new FormControl(''));
            }
          });
        }

        this.cdr.detectChanges();
        this.formGroup.reset(this.formGroup.value);
    });
  }

  get items() {
    return this.formGroup.get('items') as FormGroup;
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
        case this.Cargo.Docs:
          this.formGroup.get('items')
            .get(this.Cargo.Parcels)
            .patchValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.AutoParts)
            .patchValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.Other)
            .patchValue('', {onlySelf: true});
          break;
        case this.Cargo.Parcels:
          this.formGroup.get('items')
            .get(this.Cargo.Docs)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.AutoParts)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.Other)
            .patchValue('', {onlySelf: true});
          break;
        case this.Cargo.AutoParts:
          this.formGroup
            .get('items').get(this.Cargo.Parcels)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.Docs)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.Other)
            .patchValue('', {onlySelf: true});
          break;
        case this.Cargo.Other:
          this.formGroup
            .get('items').get(this.Cargo.Parcels)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.Docs)
            .setValue('', {onlySelf: true});
          this.formGroup.get('items')
            .get(this.Cargo.AutoParts)
            .patchValue('', {onlySelf: true});
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
