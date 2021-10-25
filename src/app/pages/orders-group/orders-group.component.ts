import { Component, OnInit } from '@angular/core';
import {CalculatorService} from '../../core/services/calculator/calculator.service';
import {forkJoin, Subscription, zip} from 'rxjs';
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
    if (!(this.localStorage.get('types')
      && this.localStorage.get('services')
      && this.localStorage.get('offices'))) {
      zip(
        this.calcService.getTypes('1', '1'),
        this.calcService.getServices('1'),
        this.calcService.getOffices()
      ).subscribe(([types, services, offices]) => {
        this.localStorage.set('types', types),
        this.localStorage.set('services', services);
        this.localStorage.set('offices', offices);
      });
    }
  }
}
