import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {delay} from 'rxjs/operators';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
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

  constructor(
    private simpleModal: SimpleModalService,
    private orderForm: OrderFormService,
    private calcService: CalculatorService) { }

  ngOnInit(): void {
    this.isBreakpointMatched =  window.matchMedia(`(min-width: 992px)`).matches;
    this.isContentVisible = this.isBreakpointMatched;
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
        this.isContentVisible = true;
        this.isLoading = false;
      });
  }

  toggle() {
    this.isContentVisible = !this.isContentVisible;
  }

  @HostListener('window:resize', ['$event'])

  resize() {
    this.isBreakpointMatched =  window.matchMedia(`(min-width: 992px)`).matches;
    this.isContentVisible = this.isBreakpointMatched;
  }
}
