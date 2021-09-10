import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {LocalStorageService} from '../../../../../../core/services/local-storage.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() currentStep;
  @Input() form;
  @Input() pickupInvalid;

  @Output() clear: EventEmitter<any> = new EventEmitter<any>();

  public FormStep = {
    One: 0,
    Two: 1,
    Three: 2,
    Four: 3
  };

  public cargoList;
  public isOrderVisible = false;
  private orderSuccess = true;

  public pickupFormInvalid: boolean;

  public totalSum = 0;
  public isLoading = false;

  constructor(
    private simpleModal: SimpleModalService,
    private orderForm: OrderFormService,
    private calcService: CalculatorService,
    private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.form.currentValue) {
      this.calculateTotalSum(changes.form.currentValue);
    }
  }

  calculateTotalSum(data) {
    this.isLoading = true;

    const cityFromId = data[FormControlName.DeparturePoint].location;
    const cityToId = data[FormControlName.PickupPoint].location;
    const orders = data.orders.orders;

    orders.forEach((order) => {
      this.calculateOrderSum(cityFromId, cityToId, order);
    });
  }

  calculateOrderSum(cityFromId, cityToId, order) {
    const cargoId = order.activeCargo;
    const cargo = order.cargo[cargoId];

    let dim = null;
    let weight = null;

    if (cargoId === '2') {
      weight = this.getWeight(cargo);
      dim = this.getDim(cargo);
    }

    const servicesId = this.getServicesId(order);

    this.calcService.getResult(cityFromId, cityToId, cargoId, servicesId, weight, dim)
      .pipe(delay(3000))
      .subscribe((sum: {price: number}) => {
        this.totalSum = sum.price;
        this.isLoading = false;
      });
  }

  getDim(cargo) {
    const objSum =  cargo.reduce((acc, obj) => ({
        length: acc.length + +obj.length,
        width: acc.width + +obj.width,
        height: acc.height + +obj.height
      }), {width: 0, height: 0, length: 0});

    return Object.values(objSum)
      .reduce((sum: number, val: number) => sum + val, 0);
  }

  getWeight(cargo) {
    return cargo.reduce((sum, {weight}) => sum + +weight, 0);
  }

  getServicesId(order) {
    const packageIds = Object.entries(order.package)
      .map(([key, value]: [string, any]) => {
        return value.filter((item) => {
          return item.counter;
        });
      })
      .filter((array) => {
        return array.length;
      })
      .reduce((acc, val) => acc.concat(val), [])
      .map((obj) => {
        const id = Object.keys(obj)[0];
        const count = Object.values(obj)[1];

        return Array(+count + 1).join(`${id} `).split(' ');
      })
      .reduce((acc, val) => acc.concat(val), [])
      .filter((el) => el);

    const servicesIds = order.services.items
      .map((obj) => {
        return Object.entries(obj)[0][1] ?  Object.entries(obj)[0][0] : null;
      })
      .filter((id) => id);

    return [...packageIds, ...servicesIds];
  }

  // getCargoList(data) {
  //   return data.steps[2]['cargo-group'];
  // }
  showOrder() {
    this.isOrderVisible = true;
  }

  completeOrder() {
    if (this.orderSuccess) {
      this.localStorage.set('quick-order', this.form);
      this.router.navigate(['orders', 'order', 'new']);
    } else {
      // this.confirmRetry();
    }
  }

  confirmClear() {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Вы уверены?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.clear.emit();
        // this.router.navigate(['orders', 'quick-order', 'new']);
      }
    });
  }
}
