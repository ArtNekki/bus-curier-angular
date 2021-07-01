import { Component, OnInit } from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';
import {ConfirmModel} from '../confirm-modal/confirm-modal.component';

export interface AlertModel {
  message: string;
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent extends SimpleModalComponent<AlertModel, boolean> implements AlertModel {
  message: string;

  constructor() {
    super();
  }

  ok() {
    this.result = true;
    this.close();
  }
}
