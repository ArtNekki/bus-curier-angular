import { Component, OnInit } from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {CreateInvoiceComponent} from '../../../../modals/create-invoice/create-invoice.component';

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
}
