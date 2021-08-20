import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import FormControlName from '../../../core/maps/FormControlName';
import {delay, switchMap, tap} from 'rxjs/operators';
import Service from '../../../core/models/Service';
import {OrderFormService} from '../../../core/services/order-form/order-form.service';
import {CalculatorService} from '../../../core/services/calculator/calculator.service';

@Component({
  selector: 'app-calc-rate-page',
  templateUrl: './calc-rate-page.component.html',
  styleUrls: ['./calc-rate-page.component.scss']
})
export class CalcRatePageComponent implements OnInit {
  public FormControlName = FormControlName;

  public form: FormGroup;
  public cities = cities;
  public cityId: string;
  public loading = false;

  constructor(protected orderForm: OrderFormService, private calcService: CalculatorService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.DeparturePoint]: new FormControl('', [Validators.required]),
      [FormControlName.PickupPoint]: new FormControl('', [Validators.required]),
      ['cargo-group']: new FormControl('', [Validators.required]),
      [FormControlName.Packaging]: new FormControl(''),
      [FormControlName.Services]: new FormControl('')
    });

    this.orderForm.cityFrom$.pipe(
      tap(() => {
        this.loading = true;
        this.cityId = null;
      }),
      delay(1000)
    ).subscribe((id: string) => {
      this.loading = false;
      this.cityId = id;
    });
  }

  onSubmit() {
    console.log('quick order', this.form.value);
  }
}
