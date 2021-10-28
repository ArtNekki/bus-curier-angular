import {Component, OnDestroy, OnInit} from '@angular/core';
import {SimpleModalComponent} from 'ngx-simple-modal';

export interface CitiesModel {
  cities: Array<any>;
}

@Component({
  selector: 'app-cities-modal',
  templateUrl: './cities-modal.component.html',
  styleUrls: ['./cities-modal.component.scss']
})
export class CitiesModalComponent extends SimpleModalComponent<null, null> implements OnInit, OnDestroy, CitiesModel  {
  cities: Array<any>;

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log('cities', this.cities);
  }

  ngOnDestroy(): void {
  }
}
