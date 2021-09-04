import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderFormService} from '../../../../../core/services/order-form/order-form.service';
import {AuthService} from '../../../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import FormControlName from 'src/app/core/maps/FormControlName';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {
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
  public invalidStep;

  public cityFromId: string;
  public cityToId: string;

  public formData;
  public orderSuccess = true;

  constructor(
    public orderForm: OrderFormService,
    public authService: AuthService,
    private router: Router,
    private simpleModal: SimpleModalService,
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
  }

  get steps() {
    return (this.form.get('steps') as FormArray).controls;
  }

  goNext() {
    if (this.currentStep >= 3 ) {
      return;
    }

    if (this.steps[this.currentStep].invalid) {
      return;
    }

    this.currentStep++;
    this.scrollToTop();

    this.changeDetectorRef.detectChanges();

    this.orderForm.$form.next(this.form);

    // console.log('this.form', this.form);

    if (this.currentStep === this.FormStep.Four) {
      this.formData = this.formatFormValue(this.form.value);
    } else {
      this.formData = null;
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
    } else {
      this.formData = null;
    }
  }

  // get formData() {
  //   return this.form.value;
  // }

  scrollToTop() {
    window.scrollTo({
      top: 5,
      // behavior: 'smooth'
    });
  }

  onSubmit() {
    console.log('form', this.form.value);
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  setCityFromId(id: string) {
    this.cityFromId = id;
  }

  setCityToId(id: string) {
    this.cityToId = id;
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
}
