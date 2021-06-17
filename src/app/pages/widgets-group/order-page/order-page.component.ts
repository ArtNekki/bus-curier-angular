import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  public currentStep = 0;
  public cities = cities;
  public form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      lastName: new FormControl(this.cities[1].value, [Validators.required]),
      // email: new FormControl('', [Validators.required]),
      // tel: new FormControl('', [Validators.required]),
      // question: new FormControl('', [Validators.required]),
      // subscribe: new FormControl('', []),
    });
  }

  setCurrentStep($event: any) {
    this.currentStep = $event;
  }

  onSubmit() {
    console.log('form', this.form.value);
  }

  goNext() {
    if (this.currentStep >= 3 ) {
      return;
    }

    this.currentStep++;
  }

  goPrev() {
    if (this.currentStep <= 0 ) {
      return;
    }

    this.currentStep--;
  }
}
