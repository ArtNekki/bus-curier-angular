import {Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {UtilsService} from '../../../../../../core/services/utils.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import CargoType from '../../../../../../core/models/CargoType';
import {SubFormComponent} from '../sub-form/sub-form.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {tap} from 'rxjs/operators';
import Service from '../../../../../../core/models/Service';

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
export class OrdersFormComponent extends SubFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() cityFromId: string;
  @Input() cityToId: string;

  public FormControlName = FormControlName;

  public formGroup: FormGroup;
  public currentCargoIndex = 0;

  public types: Array<any> = [];
  public typesSub: Subscription;

  public services: Array<Service> = [];
  public servicesSub: Subscription;

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

    this.formGroup.markAllAsTouched();

    super.ngOnInit();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.cityFromId && changes.cityFromId.currentValue) && (changes.cityToId && changes.cityToId.currentValue)) {
      this.typesSub = this.calcService.getTypes(changes.cityFromId.currentValue, changes.cityToId.currentValue)
        // .pipe(delay(500))
        .subscribe((result: Array<CargoType>) => {
          if (result.length) {

            this.types = result;
          }

          // this.cdr.detectChanges();
          // this.formGroup.reset(this.formGroup.value);
        });
    }

    this.servicesSub = this.calcService.getServices(changes.cityFromId.currentValue)
      .subscribe((arr: Array<Service>) => {
        this.services = [...arr];
      });
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
