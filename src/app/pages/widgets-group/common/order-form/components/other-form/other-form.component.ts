import {ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {SimpleModalService} from 'ngx-simple-modal';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {map} from 'rxjs/operators';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {Subscription} from 'rxjs';
import Select from 'src/app/core/models/Select';
import CargoType from '../../../../../../core/models/CargoType';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';

@Component({
  selector: 'app-other-form',
  templateUrl: './other-form.component.html',
  styleUrls: ['./other-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtherFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OtherFormComponent),
      multi: true
    }
  ]
})
export class OtherFormComponent extends SubFormComponent implements OnInit, OnChanges {
  @Input() types: Array<CargoType> = [];

  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public parts: Array<Select> = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private simpleModal: SimpleModalService,
    private calcService: CalculatorService,
    orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      items: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });

    this.setParts(this.types);
    this.formGroup.markAllAsTouched();

    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.types && changes.types.currentValue.length && this.formGroup) {
      this.setParts(changes.types.currentValue);
    }
  }

  setParts(arr: Array<CargoType>) {
    this.parts = arr.filter((item: CargoType) => item.parent_id === '21' && item)
      .map((item: CargoType) => ({value: item.id, name: item.name}));
  }

  public get items(): FormArray {
    return this.formGroup.get('items') as FormArray;
  }

  get isSomeItemsInvalid() {
    return this.items.controls.some((control) => {
      return control.invalid;
    });
  }

  add() {
    this.items.push(new FormControl('', [Validators.required]));
    this.formGroup.markAllAsTouched();
  }

  delete(index: number) {
    if (this.items.length <= 1) {
      return;
    }

    if (this.items.value[index]) {
      this.confirm().subscribe((ok) => {
        if (!ok) {
          return;
        }

        this.items.removeAt(index);
        this.cdr.detectChanges();
      });
    } else {
      this.items.removeAt(index);
    }
  }

  confirm() {
    return this.simpleModal.addModal(ConfirmModalComponent, {
      message: `Вы уверены? <br /> Данные будут потеряны.`
    });
  }

  writeValue(value: any): void {
    if (value) {
      this.items.clear();
      value.forEach(item => this.items.push(new FormControl(item, [Validators.required])));
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.pipe( map(value => value.items)).subscribe(fn);
  }
}
