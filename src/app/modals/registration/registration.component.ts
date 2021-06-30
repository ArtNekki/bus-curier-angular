import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
