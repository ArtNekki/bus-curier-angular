import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../../core/services/order/order.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import FormControlName from 'src/app/core/maps/FormControlName';
import {OrderTracking} from '../../../../core/interfaces/order';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-track-order-page',
  templateUrl: './track-order-page.component.html',
  styleUrls: ['./track-order-page.component.scss']
})
export class TrackOrderPageComponent implements OnInit {
  public FormControlName = FormControlName;

  public form: FormGroup;
  public orderNumber = null;
  public orderData: OrderTracking[] = [];
  public isLoading = false;
  public error = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.OrderNumber]: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.orderNumber = this.form.value[FormControlName.OrderNumber];
    this.form.reset();

    this.orderService.getTracking(this.orderNumber)
      .subscribe((data: OrderTracking[]) => {
        if (data) {
          this.orderData = data;
          this.error = false;
          this.isLoading = false;
        }
      }, (err) => {
          this.error = true;
          this.orderData = [];
          this.orderNumber = '';
          this.isLoading = false;
      });
  }
}
