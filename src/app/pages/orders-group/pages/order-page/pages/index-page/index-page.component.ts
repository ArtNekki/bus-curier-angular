import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import FormControlName from 'src/app/core/maps/FormControlName';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import fadeIn from '../../../../../../core/animations/fadeIn';
import {LocalStorageService} from '../../../../../../core/services/local-storage.service';
import {debounceTime, delay, pairwise, take} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AlertModalComponent} from '../../../../../../modals/alert-modal/alert-modal.component';
import {OrderService} from '../../../../../../core/services/order/order.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  animations: [fadeIn]
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public FormControlName = FormControlName;
  public FormStep = {
    One: 0,
    Two: 1,
    Three: 2,
    Four: 3
  };

  public form: FormGroup;
  public stepLabels = ['Автор заявки', 'Отправитель груза', 'Параметры груза', 'Завершение'];
  public currentStep = 0;
  public currentUser = null;

  public cityFromId: string;
  public cityToId: string;

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

  private Courier = {
    pickup: '1',
    delivery: '2'
  };

  public formData;
  public isLoading = false;

  private departureSub: Subscription;
  private deliverySub: Subscription;
  private ordersSub: Subscription;

  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private calcService: CalculatorService,
    private router: Router,
    private simpleModal: SimpleModalService,
    private localStorage: LocalStorageService,
    protected changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      steps: new FormArray([
        new FormGroup({
          author: new FormControl('', [Validators.required])
        }),
        new FormGroup({
          [FormControlName.Sender]: new FormControl('', [Validators.required]),
          [FormControlName.DeparturePoint]: new FormControl('', [Validators.required])
        }),
        new FormGroup({
          ['orders']: new FormControl('', [Validators.required]),
          [FormControlName.Recipient]: new FormControl('', [Validators.required]),
          [FormControlName.DeliveryPoint]: new FormControl('', [Validators.required])
        }),
        new FormGroup({
          [FormControlName.Comment]: new FormControl(''),
          [FormControlName.Agree]: new FormControl('', [Validators.required]),
          [FormControlName.Captcha]: new FormControl('', [Validators.required])
        }),
      ])
    });

    this.setDefaultData();

    this.departureSub = this.steps[this.FormStep.Two]
      .get(FormControlName.DeparturePoint).valueChanges
      .pipe(
        delay(0),
        debounceTime(0),
        pairwise()
      )
      .subscribe(([prev, next]) => {
        if (this.formData) {
          this.formData = this.formatFormValue(this.form.value);
        }

        if (prev.location && (prev.location !== next.location)) {

          if (this.localStorage.get('quick-order')) {
            this.clearForm()
              .pipe(take(1))
              .subscribe(() => {
                this.alertClear();
              });
          }

        }

        if (next && (this.departure.cityId !== next.location)) {
          this.departure = Object.assign({}, this.departure, {cityId: next.location});
          this.calcService.cityFromId$.next(next.location);
        }

        if (next) {
          this.departure = Object.assign({}, this.departure,
            {
              courier: (next.options.active === FormControlName.Pickup) || false,
              officeId: (next.options.give && next.options.give.office) || null
            });
        }
    });

    this.deliverySub = this.steps[this.FormStep.Three]
      .get(FormControlName.DeliveryPoint).valueChanges
      .pipe(delay(0))
      .subscribe((data) => {
        if (this.formData) {
          this.formData = this.formatFormValue(this.form.value);
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

    this.ordersSub = this.steps[this.FormStep.Three]
      .get('orders').valueChanges
      .pipe(delay(0))
      .subscribe((result) => {
        if (this.formData) {
          this.formData = this.formatFormValue(this.form.value);
          // this.scrollToTop();
        }
    });
  }

  setDefaultData() {
    const defaultData = this.localStorage.get('quick-order');

    if (defaultData) {
      this.steps[this.FormStep.Two]
        .get(FormControlName.DeparturePoint)
        .setValue(defaultData[FormControlName.DeparturePoint]);
      this.steps[this.FormStep.Three]
        .get(FormControlName.DeliveryPoint)
        .setValue(defaultData[FormControlName.DeliveryPoint]);
      this.steps[this.FormStep.Three]
        .get('orders')
        .setValue(defaultData.orders);

      this.formData = defaultData;
    }
  }

  get steps() {
    return (this.form.get('steps') as FormArray).controls;
  }

  goNext() {
    if (this.steps[this.currentStep].invalid) {
      return;
    }

    if (this.currentStep >= 3 ) {
      return;
    }

    this.currentStep++;
    this.scrollToTop();
    this.changeDetectorRef.detectChanges();

    if (this.currentStep === this.FormStep.Four) {
      this.formData = this.formatFormValue(this.form.value);
    }
  }

  goPrev() {
    if (this.currentStep <= 0 ) {
      return;
    }

    this.currentStep--;
    this.scrollToTop();

    if (this.currentStep === this.FormStep.Four) {
      this.formData = this.formatFormValue(this.form.value);
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 5,
      // behavior: 'smooth'
    });
  }

  onSubmit() {}

  setCurrentUser(user: any) {
    this.currentUser = user;
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

  completeOrder() {
    this.isLoading = true;

    const formValue = this.formatFormValue(this.form.value);
    const courierFromId = this.Courier[formValue[FormControlName.DeparturePoint].options
    && formValue[FormControlName.DeparturePoint].options.active];
    const courierToId = this.Courier[formValue[FormControlName.DeliveryPoint].options
    && formValue[FormControlName.DeliveryPoint].options.active];

    console.log('formValue', formValue);

    const orders = formValue.orders.orders.map((order, i) => {
      const activeCargoData = order.cargo[order.activeCargo];

      const services = [
        courierFromId && i === 0 ? {
          id: courierFromId,
          value: this.formatCourierData(formValue[FormControlName.DeparturePoint].options.pickup)
        } : null,
        courierToId && i === 0 ? {
          id: courierToId,
          value: this.formatCourierData(formValue[FormControlName.DeliveryPoint].options.delivery)
        } : null,
        ...this.calcService.getPackageIds(order)
          .map((id) => ({id, value: ''})),
        ...this.calcService.getAddServices(order)
      ].filter((service) => service);

      return {
        cargo_type: order.activeCargo,
        cargo_count: activeCargoData.length ? this.calcService.getParcelPlaces(activeCargoData) : activeCargoData.count,
        dimensions: activeCargoData.length ? activeCargoData : '',
        services
      };
    });

    const data = {
      'api-key': '8aab09f6-c5b3-43be-8895-153ea164984e',
      site_id: '1',
      sending_date: formValue[FormControlName.DeparturePoint].date,
      start_city: formValue[FormControlName.DeparturePoint].location,
      end_city: formValue[FormControlName.DeliveryPoint].location,
      sender_name: formValue.sender.fio,
      sender_phone: formValue.sender.tel,
      sender_passport: formValue.sender[FormControlName.RusPassport],
      recipient_name: formValue.recipient.fio,
      recipient_phone: formValue.recipient.tel,
      note: formValue.comment,
      orders
    };

    this.orderService.sendOrder(data)
      .subscribe((result) => {
        console.log('result', result);
        this.isLoading = false;
        this.router.navigate(['orders', 'order', 'new', 'id', 'done']);
      },
      (error) => {
        this.isLoading = false;
        this.confirmRetry();
      });
  }

  formatCourierData(data) {
    return `
    ул. ${data.street}, дом. ${data.building}, кв. ${data.apartment},
    время прибытия: ${data['courier-time']}`;
  }

  confirmRetry() {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Не удалось оформить заявкую  <br> Попробовать еще раз?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        // try
      } else {
        this.router.navigate(['orders', 'order', 'new', 'fail']);
      }
    });
  }

  clearForm() {
    return new Observable((sub) => {
      this.departure.cityId = '';
      this.delivery.cityId = '';
      this.formData = null;
      this.steps[this.FormStep.Three]
        .get(FormControlName.DeliveryPoint).reset();
      this.steps[this.FormStep.Three]
        .get('orders').reset();
      sub.next(true);
    });
  }

  alertClear() {
    this.simpleModal.addModal(AlertModalComponent, {
      message: 'Город отправления изменен! <br />Город получения и заказы удалены!'
    }).pipe(take(1)).subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.localStorage.remove('quick-order');

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

  captchaResolved($event: string) {
    console.log('captcha', $event);
  }
}
