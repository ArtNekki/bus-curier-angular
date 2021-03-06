import {Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {delay} from 'rxjs/operators';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {SimpleModalService} from 'ngx-simple-modal';
import {Subscription} from 'rxjs';
import {FormArray} from '@angular/forms';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  // @Input() form;

  public form: any = {};
  public totalSum = 0;
  public isLoading = false;
  public isContentVisible = false;
  public isBreakpointMatched = false;
  public isTotalSumUpdated = false;

  private formSub: Subscription;

  private Courier = {
    pickup: '1',
    delivery: '2'
  };

  constructor(
    private simpleModal: SimpleModalService,
    private calcService: CalculatorService) {}

  ngOnInit(): void {
    this.isBreakpointMatched =  window.matchMedia(`(min-width: 992px)`).matches;

    this.formSub = this.calcService.form$
      .subscribe((form: any) => {
        this.form = form;

        if (form.value) {
          const departureInvalid = this.steps[1].get(FormControlName.DeparturePoint).invalid;
          const deliveryInvalid = this.steps[2].get(FormControlName.DeliveryPoint).invalid;
          const ordersInvalid = this.steps[2].get(FormControlName.Orders).invalid;

          if (departureInvalid || deliveryInvalid || ordersInvalid) {
            this.isLoading = true;
          } else {
            this.calculateTotalSum(this.formatFormValue(form.value));
          }
        }
      });
  }

  calculateTotalSum(data) {
    this.isLoading = true;

    const cityFromId = data[FormControlName.DeparturePoint].location;
    const cityToId = data[FormControlName.DeliveryPoint].location;
    const orders = data.orders.orders;

    const courierFromId = this.Courier[data[FormControlName.DeparturePoint].options
    && data[FormControlName.DeparturePoint].options.active];
    const courierToId = this.Courier[data[FormControlName.DeliveryPoint].options
    && data[FormControlName.DeliveryPoint].options.active];

    this.calcService.calculateTotalSum({cityFromId, cityToId, courierFromId, courierToId, orders})
      .pipe(delay(1000))
      .subscribe((sum: number) => {
        if (sum) {
          this.totalSum = sum;
          this.isTotalSumUpdated = true;
          this.isLoading = false;
        }

        setTimeout(() => {
          this.isTotalSumUpdated = false;
        }, 1000);
      });
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;

    if (this.isContentVisible) {
      document.documentElement.classList.add('page--order-sidebar-open');
    } else {
      document.documentElement.classList.remove('page--order-sidebar-open');
    }
  }

  formatFormValue(obj) {
    return {
      [FormControlName.Author]: obj.steps[0].author,
      [FormControlName.Sender]: obj.steps[1].sender,
      [FormControlName.DeparturePoint]: obj.steps[1][FormControlName.DeparturePoint],
      orders: obj.steps[2].orders,
      [FormControlName.DeliveryPoint]: obj.steps[2][FormControlName.DeliveryPoint],
      [FormControlName.Recipient]: obj.steps[2].recipient,
      [FormControlName.Comment]: obj.steps[3].comment,
      [FormControlName.Agree]: obj.steps[3].agree
    };
  }

  get steps() {
    return (this.form.get('steps') as FormArray).controls;
  }

  @HostListener('window:resize', ['$event'])

  resize() {
    this.isBreakpointMatched =  window.matchMedia(`(min-width: 992px)`).matches;
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
