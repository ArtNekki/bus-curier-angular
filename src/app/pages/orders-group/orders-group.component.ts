import { Component, OnInit } from '@angular/core';
import {CalculatorService} from './common/services/calculator/calculator.service';
import {forkJoin, Subscription, zip} from 'rxjs';
import CityTo from '../../core/models/CityTo';
import CargoType from '../../core/models/CargoType';
import {LocalStorageService} from '../../core/services/local-storage.service';

@Component({
  selector: 'app-orders-group',
  templateUrl: './orders-group.component.html'
})
export class OrdersGroupComponent implements OnInit {

  constructor(
    private calcService: CalculatorService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    if (!(this.localStorage.get('cities') &&
      this.localStorage.get('types') && this.localStorage.get('services') && this.localStorage.get('offices'))) {
      zip(
        this.calcService.getCityTo('1', 0),
        this.calcService.getTypes('1', '1'),
        this.calcService.getServices('1'),
        this.calcService.getOffices()
      ).subscribe((arr) => {
        this.localStorage.set('cities', arr[0]),
        this.localStorage.set('types', arr[1]),
        this.localStorage.set('services', arr[2]);
        this.localStorage.set('offices', arr[3]);
      });
    }
  }
}
