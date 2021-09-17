import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {delay} from 'rxjs/operators';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

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

  private departureSub: Subscription;
  private pickupSub: Subscription;
  private ordersSub: Subscription;

  constructor(
    protected orderForm: OrderFormService,
    private calcService: CalculatorService,
    private simpleModal: SimpleModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.DeparturePoint]: new FormControl('', [Validators.required]),
      [FormControlName.PickupPoint]: new FormControl('', [Validators.required]),
      ['orders']: new FormControl('', [Validators.required])
    });

    this.departureSub = this.form.get(FormControlName.DeparturePoint).valueChanges
      .pipe(delay(0))
      .subscribe((data) => {
        if (this.formData) {
          this.formData = this.form.value;
          // this.scrollToTop();
        }

        if (data && (this.cityFromId !== data.location)) {
          this.clearForm();
          this.cityFromId = data.location;
          console.log('this.q-form', this.form.value);
        }

    });

    this.pickupSub = this.form.get(FormControlName.PickupPoint).valueChanges
      .pipe(delay(0))
      .subscribe((data) => {
        if (this.formData) {
          this.formData = this.form.value;
          // this.scrollToTop();
        }

        if (data && (this.cityToId !== data.location)) {
          this.cityToId = data.location;
        }
    });

    this.ordersSub = this.form.get(FormControlName.Orders).valueChanges
      .pipe(delay(0))
      .subscribe((result) => {
        if (this.formData) {
          this.formData = this.form.value;
          // this.scrollToTop();
        }
    });
  }

  onSubmit() {
    this.formData = this.form.value;
    // this.scrollToTop();
    console.log('quick form', this.formData);
  }

  confirmClear() {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Данные будут потеряны! <br> Вы уверены?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

      }
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 45,
      behavior: 'smooth'
    });
  }

  clearForm() {
    this.cityFromId = '';
    this.cityToId = '';
    this.formData = null;
    this.form.get(FormControlName.PickupPoint).reset();
    this.form.get(FormControlName.Orders).reset();

    // this.router.navigate(['orders', 'quick-order']);
  }

  ngOnDestroy(): void {

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
