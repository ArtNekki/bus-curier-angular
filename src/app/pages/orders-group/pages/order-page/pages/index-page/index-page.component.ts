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

  public pickup = {
    cityId: '',
    officeId: '',
    courier: false
  };

  public formData;
  public orderSuccess = true;

  private departureSub: Subscription;
  private pickupSub: Subscription;
  private ordersSub: Subscription;

  constructor(
    public authService: AuthService,
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
          [FormControlName.PickupPoint]: new FormControl('', [Validators.required])
        }),
        new FormGroup({

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
          this.departure = Object.assign(this.departure, {cityId: next.location});
        }

        if (next) {
          this.departure = Object.assign(this.departure,
            {
              courier: (next.options.active === FormControlName.Pickup) || false,
              officeId: (next.options.give && next.options.give.office) || null
            });
        }
    });

    this.pickupSub = this.steps[this.FormStep.Three]
      .get(FormControlName.PickupPoint).valueChanges
      .pipe(delay(0))
      .subscribe((data) => {
        if (this.formData) {
          this.formData = this.formatFormValue(this.form.value);
        }

        if (data && (this.pickup.cityId !== data.location)) {
          this.pickup = Object.assign(this.pickup, {cityId: data.location});
        }

        if (data) {
          this.pickup = Object.assign(this.pickup,
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
        .get(FormControlName.PickupPoint)
        .setValue(defaultData[FormControlName.PickupPoint]);
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
      [FormControlName.PickupPoint]: obj.steps[2][FormControlName.PickupPoint],
      [FormControlName.Recipient]: obj.steps[2].recipient
    };
  }

  completeOrder() {
    if (this.orderSuccess) {
      this.router.navigate(['orders', 'order', 'new', 'id', 'done']);
    } else {
      this.confirmRetry();
    }
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
      this.cityFromId = '';
      this.cityToId = '';
      this.formData = null;
      this.steps[this.FormStep.Three]
        .get(FormControlName.PickupPoint).reset();
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

    if (this.pickupSub) {
      this.pickupSub.unsubscribe();
    }

    if (this.ordersSub) {
      this.ordersSub.unsubscribe();
    }
  }
}
