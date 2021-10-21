import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {debounceTime, delay, pairwise, take} from 'rxjs/operators';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AlertModalComponent} from '../../../../../../modals/alert-modal/alert-modal.component';
import {CourierMode} from '../../../../../../core/interfaces/calculator';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy {

  public FormControlName = FormControlName;

  public form: FormGroup;
  public formData;

  public cityFromId: string;
  public cityToId: string;

  // public courier: CourierMode = {
  //   pickup: false,
  //   delivery: false
  // };

  public departure = {
    cityId: '',
    officeId: '',
    courier: false
  };

  public delivery = {
    cityId: '',
    officeId: '',
    courier: false
  };

  private departureSub: Subscription;
  private deliverySub: Subscription;
  private ordersSub: Subscription;
  private confirmSub: Subscription;

  constructor(
    private calcService: CalculatorService,
    private cdr: ChangeDetectorRef,
    private simpleModal: SimpleModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.DeparturePoint]: new FormControl('', [Validators.required]),
      [FormControlName.DeliveryPoint]: new FormControl('', [Validators.required]),
      ['orders']: new FormControl('', [Validators.required])
    });

    this.departureSub = this.form.get(FormControlName.DeparturePoint).valueChanges
      .pipe(
        delay(0),
        debounceTime(0),
        pairwise()
      )
      .subscribe(([prev, next]) => {

        if (this.formData) {
          this.formData = this.form.value;
        }

        if (prev.location && (prev.location !== next.location)) {
          this.clearForm()
            .pipe(take(1))
            .subscribe(() => {
              this.alertClear();
          });
        }

        if (next && (this.departure.cityId !== next.location)) {
          this.departure = Object.assign({}, this.departure, {cityId: next.location});
        }

        if (next) {
          this.departure = Object.assign({}, this.departure,
            {
              courier: (next.options.active === FormControlName.Pickup) || false,
              officeId: (next.options.give && next.options.give.office) || null
            });
        }
    });

    this.deliverySub = this.form.get(FormControlName.DeliveryPoint).valueChanges
      .pipe(
        delay(0),
        debounceTime(0),
      )
      .subscribe((data) => {
        if (this.formData) {
          this.formData = this.form.value;
        }

        if (data && (this.delivery.cityId !== data.location)) {
          this.delivery = Object.assign({}, this.delivery, {cityId: data.location});
        }

        if (data) {
          this.delivery = Object.assign({}, this.delivery,
            {
              courier: (data.options.active === FormControlName.Delivery) || false,
              officeId: (data.options.get && data.options.get.office) || null
            });
        }
    });

    this.ordersSub = this.form.get(FormControlName.Orders).valueChanges
      .pipe(delay(0))
      .subscribe((result) => {
        if (this.formData) {
          this.formData = this.form.value;
        }
    });
  }

  onSubmit() {
    this.formData = this.form.value;
    console.log('this.formData', this.formData);
  }

  // confirmClear(cityId, value) {
  //   const sub = this.simpleModal.addModal(ConfirmModalComponent, {
  //     message: 'Данные будут потеряны! <br> Вы уверены?'
  //   })
  //     .subscribe((isConfirmed: boolean) => {
  //       if (isConfirmed) {
  //         this.clearForm();
  //         console.log('ok');
  //       } else {
  //         this.form.get(FormControlName.DeparturePoint)
  //           .setValue(value, {onlySelf: true, emitEvent: false});
  //       }
  //     });
  // }

  scrollToTop() {
    window.scrollTo({
      top: 45,
      behavior: 'smooth'
    });
  }

  clearForm() {
    return new Observable((sub) => {
      this.departure.cityId = '';
      this.delivery.cityId = '';
      this.formData = null;
      this.form.get(FormControlName.DeliveryPoint).reset();
      this.form.get(FormControlName.Orders).reset();

      this.router.navigate([], {
        queryParams: {
          cityFromId: null,
          cityToId: null
        },
        queryParamsHandling: 'merge'});

      sub.next(true);
    });
  }

  alertClear() {
    this.simpleModal.addModal(AlertModalComponent, {
      message: 'Город отправления изменен! <br />Данные заказа удалены!'
    }).pipe(take(1)).subscribe(() => {});
  }

  clearAllForm() {
    this.router.navigate(['orders', 'quick-order', 'new']).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy(): void {

    if (this.departureSub) {
      this.departureSub.unsubscribe();
    }

    if (this.deliverySub) {
      this.deliverySub.unsubscribe();
    }

    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
  }
}
