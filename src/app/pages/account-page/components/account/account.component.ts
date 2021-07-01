import { Component, OnInit } from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {CreateInvoiceComponent} from '../../../../modals/create-invoice/create-invoice.component';
import {OrderModalComponent} from '../../../../modals/order-modal/order-modal.component';
import {ManagerCallModalComponent} from '../../../../modals/manager-call-modal/manager-call-modal.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private modalService: SimpleModalService) { }

  ngOnInit(): void {
  }

  showInvoiceModal() {
    this.modalService.addModal(CreateInvoiceComponent);
  }

  showOrderModal() {
    // this.modalService.addModal(OrderModalComponent);
    this.modalService.addModal(ManagerCallModalComponent);
  }
}
