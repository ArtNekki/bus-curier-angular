import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {delay, tap} from 'rxjs/operators';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy {

  public FormControlName = FormControlName;

  public form: FormGroup;
  public cityId: string;
  public loading = false;

  public formData;

  public cityFromId: string;
  public cityToId: string;

  public defaultCityFromId = null;
  public defaultCityToId = null;

  private departureSub: Subscription;
  private pickupSub: Subscription;
  private ordersSub: Subscription;

  constructor(
    protected orderForm: OrderFormService,
    private calcService: CalculatorService,
    private simpleModal: SimpleModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.DeparturePoint]: new FormControl('', [Validators.required]),
      [FormControlName.PickupPoint]: new FormControl('', [Validators.required]),
      ['orders']: new FormControl('', [Validators.required])
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.defaultCityFromId = params.cityFromId;
      this.defaultCityToId = params.cityToId;
    });

    this.departureSub = this.form.get(FormControlName.DeparturePoint).valueChanges
      .pipe(delay(0))
      .subscribe((data) => {
        if (this.formData) {
          this.formData = this.form.value;
          // this.scrollToTop();
        }

        if (this.cityFromId !== data.location) {
          this.cityFromId = data.location;
          this.formData = null;
          console.log('this.form', this.form.value);
        }

    });

    this.pickupSub = this.form.get(FormControlName.PickupPoint).valueChanges
      .pipe(delay(0))
      .subscribe((data) => {
        if (this.formData) {
          this.formData = this.form.value;
          // this.scrollToTop();
        }

        if (this.cityToId !== data.location) {
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

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.loading = false;
    //     console.log('fff');
    //   }
    // });

  }

  onSubmit() {
    this.formData = this.form.value;
    // this.scrollToTop();
    console.log('quick form', this.formData);
  }

  setCityFromId(id: string) {

    if (id !== this.cityFromId) {

    }

    // this.cityFromId = id;
  }

  setCityToId(id: string) {
    // this.cityToId = id;
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
    this.loading = true;
    this.form.get(FormControlName.DeparturePoint).setValue('');
    this.form.get(FormControlName.PickupPoint).setValue('');
    this.form.get(FormControlName.Orders).setValue('');
    this.form.reset({});
    this.formData = null;
    this.cityFromId = null;
    this.cityToId = null;

    this.router.navigate(['orders', 'quick-order']);
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
