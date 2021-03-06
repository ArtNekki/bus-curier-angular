import {ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {delay} from 'rxjs/operators';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SubFormComponent} from '../sub-form/sub-form.component';
import fadeIn from '../../../../../../core/animations/fadeIn';
import FormControlName from 'src/app/core/maps/FormControlName';
import {CargoType, CourierMode, Service} from '../../../../../../core/interfaces/calculator';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  animations: [fadeIn],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OrderFormComponent),
      multi: true
    }
  ]
})
export class OrderFormComponent extends SubFormComponent implements OnInit, OnChanges {
  @Input() departure: any;
  @Input() delivery: any;
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

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private cdr: ChangeDetectorRef,
              private simpleModal: SimpleModalService) {
    super();
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      activeCargo: new FormControl(this.Cargo.Docs),
      cargo: new FormGroup({}, [Validators.required]),
      [FormControlName.Package]: new FormControl(''),
      [FormControlName.Services]: new FormControl('')
    });

    super.ngOnInit();

    if (this.types.length) {
      this.setTypes(this.types, false);
    }

    this.formGroup.get('activeCargo').valueChanges
      .pipe(delay(10))
      .subscribe((id: string) => {

        Object.entries(this.cargo.controls)
          .filter((control) => {
            return control[0] !== id;
        })
          .forEach((control) => {
            control[1].patchValue('', {onlySelf: true});
          });
      });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.types && changes.types.currentValue.length  && !changes.types.firstChange) {
      this.setTypes(changes.types.currentValue, true);
    }
  }

  get cargo() {
    return this.formGroup.get('cargo') as FormGroup;
  }

  setCargoType(e, type: string) {

    if (!e.preventDefault) {
      return;
    }

    this.formGroup.get('activeCargo').setValue(type);

    // this.confirm().subscribe((result) => {
    //
    //   if (!result) {
    //     return;
    //   }
    //
    //   this.formGroup.get('activeCargo').setValue(type);
    //
    // });
  }

  setTypes(types, onChanges) {
    const cargoTypes = types.filter((item: CargoType) => item.parent_id === '0' && item)
      .map((item: CargoType) => ({id: item.id, name: item.name}));

    cargoTypes.forEach((item: CargoType) => {
      this.cargo.addControl(item.id, new FormControl(''));
    });

    if (onChanges) {
      this.cdr.detectChanges();
      // this.formGroup.reset(this.formGroup.value); Из-за этой строчки некорректно работает валидация parcel
    }
  }

  confirm() {
    return this.simpleModal.addModal(ConfirmModalComponent, {
      message: `Вы уверены? <br /> Данные этого груза будут потеряны.`
    });
  }
}
