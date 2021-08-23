import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import FormControlName from '../../../core/maps/FormControlName';
import {OrderFormService} from '../../../core/services/order-form/order-form.service';
import {AuthService} from '../../../core/services/auth/auth.service';
import fadeIn from '../../../core/animations/fadeIn';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  animations: [fadeIn]
})

export class OrderPageComponent implements OnInit {
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

  constructor(
    public orderForm: OrderFormService,
    public authService: AuthService,
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
          ['cargo-group']: new FormControl('', [Validators.required]),
          [FormControlName.Packaging]: new FormControl(''),
          [FormControlName.Services]: new FormControl(''),
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

    console.log('this.form', this.form);
  }

  goPrev() {
    if (this.currentStep <= 0 ) {
      return;
    }

    this.currentStep--;
    this.scrollToTop();
  }

  get formData() {
    return this.form.value;
  }

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
}
