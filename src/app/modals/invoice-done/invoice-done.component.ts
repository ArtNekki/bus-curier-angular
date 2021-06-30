import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';

@Component({
  selector: 'app-invoice-done',
  templateUrl: './invoice-done.component.html',
  styleUrls: ['./invoice-done.component.scss']
})
export class InvoiceDoneComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
