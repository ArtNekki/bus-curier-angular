import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderFormService} from '../../../../../core/services/order-form/order-form.service';
import {CalculatorService} from '../../../../../core/services/calculator/calculator.service';
import {SimpleModalService} from 'ngx-simple-modal';
import {delay, tap} from 'rxjs/operators';
import {ConfirmModalComponent} from '../../../../../modals/confirm-modal/confirm-modal.component';
import FormControlName from 'src/app/core/maps/FormControlName';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, DoCheck {

  public FormControlName = FormControlName;

  public form: FormGroup;
  public cityId: string;
  public loading = false;

  public formData;

  public cityFromId: string;
  public cityToId: string;

  constructor(
    protected orderForm: OrderFormService,
    private calcService: CalculatorService,
    private simpleModal: SimpleModalService,
    private router: Router) { }

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
