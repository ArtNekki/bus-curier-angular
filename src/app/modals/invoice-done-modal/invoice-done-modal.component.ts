import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';

@Component({
  selector: 'app-invoice-done-modal',
  templateUrl: './invoice-done-modal.component.html',
  styleUrls: ['./invoice-done-modal.component.scss']
})
export class InvoiceDoneModalComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
