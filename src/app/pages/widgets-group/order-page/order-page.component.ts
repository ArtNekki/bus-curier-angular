import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import FormControlName from '../../../core/maps/FormControlName';
import {OrderFormService} from '../../../core/services/order-form/order-form.service';
import {AuthService} from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  animations: [
    trigger('tag', [
    transition('void => *', [
      style({opacity: 0}),
      animate('200ms')
    ])
  ]),
    trigger('panel', [
      transition('void => *', [
        style({opacity: 0}),
        animate('200ms')
      ])
    ])
  ]
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
  public currentStep = 0;
  public currentUser = null;
  public invalidStep;

  constructor(
    public orderForm: OrderFormService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      steps: new FormArray([
        new FormGroup({
          author: new FormControl('')
        }),
        new FormGroup({
          [FormControlName.Sender]: new FormControl(''),
          [FormControlName.DeparturePoint]: new FormControl('')
        }),
        new FormGroup({
          ['cargo-group']: new FormControl(''),
          [FormControlName.Packaging]: new FormControl(''),
          [FormControlName.Services]: new FormControl(''),
          [FormControlName.Recipient]: new FormControl(''),
          [FormControlName.PickupPoint]: new FormControl('')
        }),
        new FormGroup({

        }),
      ])
    });

    this.orderForm.invalidStep$.subscribe((step) => {
      this.invalidStep = step;
    });
  }

  get steps() {
    return (this.form.get('steps') as FormArray).controls;
  }

  goNext() {
    if (this.currentStep >= 3 ) {
      return;
    }

    this.orderForm.submit({submitted: true, step: this.currentStep});

    if (this.invalidStep != null) {
      // return;
    }

    this.currentStep++;
    this.scrollToTop();
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
