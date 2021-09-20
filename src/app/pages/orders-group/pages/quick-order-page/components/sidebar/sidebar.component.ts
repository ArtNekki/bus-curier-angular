import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {LocalStorageService} from '../../../../../../core/services/local-storage.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {debounceTime, delay} from 'rxjs/operators';
import fadeIn from '../../../../../../core/animations/fadeIn';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [fadeIn]
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() form;
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();

  public totalSum = 0;
  public isLoading = false;
  public isContentVisible = false;
  public isBreakpointMatched = false;

  constructor(
    private simpleModal: SimpleModalService,
    private orderForm: OrderFormService,
    private calcService: CalculatorService,
    private localStorage: LocalStorageService,
    private router: Router) { }

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
      .pipe(delay(1000))
      .subscribe((sum: number) => {
        this.totalSum = sum;
        this.isContentVisible = true;
        this.isLoading = false;

        // setTimeout(() => {
        //   this.isContentVisible = false;
        // }, 1000);
      });
  }

  completeOrder() {
    this.localStorage.set('quick-order', this.form);
    this.router.navigate(['orders', 'order', 'new']);
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

  toggle() {
    this.isContentVisible = !this.isContentVisible;
  }

  @HostListener('window:resize', ['$event'])

  resize() {
    this.isBreakpointMatched =  window.matchMedia(`(min-width: 992px)`).matches;
    this.isContentVisible = this.isBreakpointMatched;
  }

}
