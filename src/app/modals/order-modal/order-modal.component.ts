import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent  extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
