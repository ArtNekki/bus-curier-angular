import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import regions from './data';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
  animations: [
    trigger('dropdown', [
      transition('void => *', [
        style({opacity: 0}),
        animate('200ms')
      ])
    ])
  ]
})
export class LocationSelectorComponent implements OnInit {

  public currentCity = regions[0].cities[0].name;
  public isOpen = false;
  public regions = regions;

  constructor() { }

  ngOnInit(): void {
  }

  selectCity(city) {
    this.currentCity = city.name;
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

}
