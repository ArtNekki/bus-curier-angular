import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
import Service from '../../../../../../core/models/Service';

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
export class CargoFormComponent extends SubFormComponent implements OnInit, OnChanges {
  @Input() cityFromId: string;
  @Input() types: Array<CargoType>;
  @Input() services: Array<Service>;

  public Cargo = {
    Docs: '1',
    Parcels: '2',
    AutoParts: '5',
    Other: '21'
  };

  public CargoName = {
    1: 'Документы',
    2: 'Посылки',
    5: 'Автозапчасти',
    21: 'Другое'
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
      items: new FormGroup({}, [Validators.required]),
      [FormControlName.Package]: new FormControl(''),
      [FormControlName.Services]: new FormControl('')
    });

    super.ngOnInit();

    if (this.types.length) {
      this.setTypes(this.types, false);
    }

    this.formGroup.get('activeItem').valueChanges
      .pipe(delay(10))
      .subscribe((id: string) => {

        switch (id) {
          case this.Cargo.Docs:
            this.items
              .get(this.Cargo.Parcels)
              .patchValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.AutoParts)
              .patchValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.Other)
              .patchValue('', {onlySelf: true});
            break;
          case this.Cargo.Parcels:
            this.items
              .get(this.Cargo.Docs)
              .setValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.AutoParts)
              .setValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.Other)
              .patchValue('', {onlySelf: true});
            break;
          case this.Cargo.AutoParts:
            this.items
              .get(this.Cargo.Parcels)
              .setValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.Docs)
              .setValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.Other)
              .patchValue('', {onlySelf: true});
            break;
          case this.Cargo.Other:
            this.items
              .get(this.Cargo.Parcels)
              .setValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.Docs)
              .setValue('', {onlySelf: true});
            this.items
              .get(this.Cargo.AutoParts)
              .patchValue('', {onlySelf: true});
            break;
        }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.types && changes.types.currentValue.length  && !changes.types.firstChange) {
      this.setTypes(changes.types.currentValue, true);
    }
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

      this.formGroup.get('activeItem').setValue(type);

    });
  }

  setTypes(types, onChanges) {
    const cargoTypes = types.filter((item: CargoType) => item.parent_id === '0' && item)
      .map((item: CargoType) => ({id: item.id, name: item.name}));

    cargoTypes.forEach((item: CargoType) => {
      this.items.addControl(item.id, new FormControl(''));
    });

    if (onChanges) {
      this.cdr.detectChanges();
      this.formGroup.reset(this.formGroup.value);
    }
  }

  confirm() {
    return this.simpleModal.addModal(ConfirmModalComponent, {
      message: `Вы уверены? <br /> Данные этого груза будут потеряны.`
    });
  }
}
