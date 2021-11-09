import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {delay} from 'rxjs/operators';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {SimpleModalService} from 'ngx-simple-modal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() form;

  public totalSum = 0;
  public isLoading = false;
  public isContentVisible = false;
  public isBreakpointMatched = false;
  public isTotalSumUpdated = false;

  private Courier = {
    pickup: '1',
    delivery: '2'
  };

  constructor(
    private simpleModal: SimpleModalService,
    private calcService: CalculatorService) { }

  ngOnInit(): void {
    this.isBreakpointMatched =  window.matchMedia(`(min-width: 992px)`).matches;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.form.currentValue) {
      this.calculateTotalSum(changes.form.currentValue);
    }
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

  @HostListener('window:resize', ['$event'])

  resize() {
    this.isBreakpointMatched =  window.matchMedia(`(min-width: 992px)`).matches;
  }
}
