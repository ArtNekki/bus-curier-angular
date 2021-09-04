import {Component, DoCheck, OnInit} from '@angular/core';
import cities from 'src/app/mock-data/cities';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import FormControlName from '../../../core/maps/FormControlName';
import {delay, switchMap, tap} from 'rxjs/operators';
import Service from '../../../core/models/Service';
import {OrderFormService} from '../../../core/services/order-form/order-form.service';
import {CalculatorService} from '../../../core/services/calculator/calculator.service';
import {ConfirmModalComponent} from '../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';

@Component({
  selector: 'app-calc-rate-page',
  templateUrl: './calc-rate-page.component.html',
  styleUrls: ['./calc-rate-page.component.scss']
})
export class CalcRatePageComponent implements OnInit, DoCheck {
  public FormControlName = FormControlName;

  public form: FormGroup;
  public cities = cities;
  public cityId: string;
  public loading = false;

  public formData;

  public cityFromId: string;
  public cityToId: string;

  constructor(
              protected orderForm: OrderFormService,
              private calcService: CalculatorService,
              private simpleModal: SimpleModalService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      [FormControlName.DeparturePoint]: new FormControl('', [Validators.required]),
      [FormControlName.PickupPoint]: new FormControl({value: '', disabled: true}, [Validators.required]),
      ['orders']: new FormControl('', [Validators.required])
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
    this.formData = this.form.value;
  }

  ngDoCheck(): void {
    if (this.form.get(FormControlName.DeparturePoint).invalid) {
      this.form.get(FormControlName.PickupPoint).disable();
    } else {
      this.form.get(FormControlName.PickupPoint).enable();
    }
  }

  setCityFromId(id: string) {

    if (id !== this.cityFromId) {

    }

    this.cityFromId = id;
  }

  setCityToId(id: string) {
    this.cityToId = id;
  }

  confirmClear() {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Данные будут потеряны! <br> Вы уверены?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {

      }
    });
  }
}
