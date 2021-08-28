import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import CargoType from '../../../../../../core/models/CargoType';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrdersFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OrdersFormComponent),
      multi: true
    }
  ]
})
export class OrdersFormComponent extends SubFormComponent implements OnInit, OnDestroy {

  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public currentCargoIndex = 0;
  public types: Array<any> = [];
  public typesSub: Subscription;

  constructor(public formUtils: FormUtilsService,
              public utils: UtilsService,
              private calcService: CalculatorService,
              orderForm: OrderFormService) {
    super(orderForm);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      [FormControlName.Active]: new FormControl(0, [Validators.required]),
      [FormControlName.Orders]: new FormArray([
        new FormControl('', [Validators.required])
      ])
    });

    this.typesSub = this.calcService.getTypes(1, 1)
      // .pipe(delay(500))
      .subscribe((result: Array<CargoType>) => {
        if (result.length) {

          this.types = result.filter((item: CargoType) => item.parent_id === '0' && item)
            .map((item: CargoType) => ({id: item.id, name: item.name}));
        }

        console.log('nekki', this.types);

        // this.cdr.detectChanges();
        // this.formGroup.reset(this.formGroup.value);
      });

    this.formGroup.markAllAsTouched();

    super.ngOnInit();
  }

  public get orders(): FormArray {
    return this.formGroup.get(FormControlName.Orders) as FormArray;
  }

  addOrder() {
    if (this.isSomeControlInvalid) {
      return;
    }

    this.orders.push(new FormControl('', [Validators.required]));
    this.formGroup.get(FormControlName.Active).setValue(this.orders.length - 1);
  }

  deleteOrder(index: number) {
    this.orders.removeAt(index);
    this.formGroup.get(FormControlName.Active).setValue(this.orders.length - 1);
  }

  get isSomeControlInvalid() {
    return this.orders.controls.some((control) => control.invalid);
  }

  writeValue(value: any): void {
    if (value) {
      this.orders.clear();
      value.orders.forEach(item => this.orders.push(new FormControl(item)));
    }

    super.writeValue(value);
  }

  changeOrder($event: any) {
    // console.log('event', $event);
    // $event.preventDefault();
  }

  ngOnDestroy(): void {
    if (this.typesSub) {
      this.typesSub.unsubscribe();
    }
  }
}
