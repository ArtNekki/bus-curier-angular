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

    this.calcService.calculateTotalSum({cityFromId, cityToId, orders})
      .pipe(delay(2000))
      .subscribe((sum: number) => {
        this.totalSum = sum;
        this.isLoading = false;
      });
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
