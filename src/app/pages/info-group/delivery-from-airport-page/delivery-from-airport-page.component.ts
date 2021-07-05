import { Component, OnInit } from '@angular/core';
import { shops } from 'src/app/mock-data/slider';

@Component({
  selector: 'app-delivery-from-airport-page',
  templateUrl: './delivery-from-airport-page.component.html',
  styleUrls: ['./delivery-from-airport-page.component.scss']
})
export class DeliveryFromAirportPageComponent implements OnInit {
  public shops = shops;

  constructor() { }

  ngOnInit(): void {
  }

}
