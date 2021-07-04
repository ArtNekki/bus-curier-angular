import { Component, OnInit } from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {CreateInvoiceComponent} from '../../../../modals/create-invoice/create-invoice.component';
import {OrderModalComponent} from '../../../../modals/order-modal/order-modal.component';
import {ManagerCallModalComponent} from '../../../../modals/manager-call-modal/manager-call-modal.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import UserType from '../../../../core/maps/UserType';
import {UtilsService} from '../../../../core/services/utils.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private modalService: SimpleModalService) { }

  ngOnInit(): void {

    const url = this.utils.formatUrl(this.router.url);

    // this.router.navigate(url, {
    //   queryParams: {
    //     [UserType.Entity]: true
    //   }
    // });
  }

  showInvoiceModal() {
    this.modalService.addModal(CreateInvoiceComponent);
  }

  showOrderModal() {
    this.modalService.addModal(OrderModalComponent);
    // this.modalService.addModal(ManagerCallModalComponent);
  }
}
