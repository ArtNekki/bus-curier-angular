import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConfirmModalComponent} from '../../../../../../modals/confirm-modal/confirm-modal.component';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';
import {OrderFormService} from '../../../../../../core/services/order-form/order-form.service';
import {LocalStorageService} from '../../../../../../core/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() currentStep;
  @Input() form;
  @Input() pickupInvalid;

  public FormStep = {
    One: 0,
    Two: 1,
    Three: 2,
    Four: 3
  };

  public cargoList;
  public isOrderVisible = false;
  private orderSuccess = true;

  public pickupFormInvalid: boolean;

  constructor(
    private simpleModal: SimpleModalService,
    private orderForm: OrderFormService,
    private localStorage: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.pickupInvalid) {
      this.pickupFormInvalid = changes.pickupInvalid.currentValue;
    }

    if (changes.form) {
      // this.cargoList = this.getCargoList(changes.data.currentValue);
      // console.log('form', changes.form.currentValue);
    }

    // const firstName = changes.data.currentValue.steps[0].author.individual['first-name'];
    //

  }

  // getCargoList(data) {
  //   return data.steps[2]['cargo-group'];
  // }
  showOrder() {
    this.isOrderVisible = true;
  }

  completeOrder() {
    if (this.orderSuccess) {
      this.localStorage.set('quick-order', this.form);
      this.router.navigate(['orders', 'order', 'new']);
    } else {
      // this.confirmRetry();
    }
  }

  confirmRetry() {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Не удалось произвести расчет  <br> Попробовать еще раз?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        // try
      } else {
        this.router.navigate(['orders', 'quick-order', 'new', 'fail']);
      }
    });
  }
}
