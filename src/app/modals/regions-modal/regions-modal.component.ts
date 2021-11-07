import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';

@Component({
  selector: 'app-regions-modal',
  templateUrl: './regions-modal.component.html',
  styleUrls: ['./regions-modal.component.scss']
})
export class RegionsModalComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
