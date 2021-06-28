import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import FormControlName from '../../../core/maps/FormControlName';

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

  constructor() { }

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
          [FormControlName.Recipient]: new FormControl(''),
          [FormControlName.PickupPoint]: new FormControl('')
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

    // this.form.markAllAsTouched();
    this.currentStep++;
  }

  goPrev() {
    if (this.currentStep <= 0 ) {
      return;
    }

    this.currentStep--;
  }

  onSubmit() {
    console.log('form', this.form.value);
  }
}
