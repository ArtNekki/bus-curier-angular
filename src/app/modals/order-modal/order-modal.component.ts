import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent, SimpleModalService} from 'ngx-simple-modal';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {AlertModalComponent} from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent  extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {

  constructor(private simpleModal: SimpleModalService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  cancelOrder() {
    this.simpleModal.addModal(ConfirmModalComponent, {
      message: 'Вы точно хотите отменить заказ?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.simpleModal.addModal(AlertModalComponent, {
          message: 'Заказ отменен'
        }).subscribe(() => {
          this.close();
        });
      }
    });
  }
}
