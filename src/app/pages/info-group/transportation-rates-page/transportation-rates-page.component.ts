import { Component, OnInit } from '@angular/core';
import City from 'src/app/core/maps/City';
import fadeIn from '../../../core/animations/fadeIn';

@Component({
  selector: 'app-transportation-rates-page',
  templateUrl: './transportation-rates-page.component.html',
  styleUrls: ['./transportation-rates-page.component.scss'],
  animations: [fadeIn]
})

export class TransportationRatesPageComponent implements OnInit {
  public City = City;

  public currentCity;

  constructor() { }

  ngOnInit(): void {
    this.currentCity = City.Vladivostok;
  }

  setCurrentCity(id: any) {
    this.currentCity = id;
  }
}
