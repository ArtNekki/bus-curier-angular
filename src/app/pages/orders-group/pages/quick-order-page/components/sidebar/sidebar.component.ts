import {Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../../../../core/services/local-storage.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {debounceTime, delay} from 'rxjs/operators';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [fadeIn]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() toggle: EventEmitter<any> = new EventEmitter<any>();
  @Output() totalSumUpdated: EventEmitter<any> = new EventEmitter<any>();
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();

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
    private calcService: CalculatorService,
    private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.isBreakpointMatched = window.matchMedia(`(min-width: 992px)`).matches;

    this.formSub = this.calcService.form$
      .subscribe((form: any) => {
        this.form = form;
        // console.log('quick sidebar', this.form.value);

        if (form.invalid) {
          this.isLoading = true;
        } else if (form.value) {
          this.calculateTotalSum(form.value);
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

    this.totalSumUpdated.emit(false);

    this.calcService.calculateTotalSum({cityFromId, cityToId, courierFromId, courierToId, orders})
      .pipe(delay(1000))
      .subscribe((sum: number) => {

        if (sum) {
          this.totalSum = sum;
          this.isTotalSumUpdated = true;
          this.totalSumUpdated.emit(true);
          this.isLoading = false;
        }

        setTimeout(() => {
          this.isTotalSumUpdated = false;
        }, 1000);
      });
  }

  completeOrder() {
    this.localStorage.set('quick-order', this.form.value);
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

    if (this.isBreakpointMatched) {
      this.toggle.emit(false);
    }
  }

  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
