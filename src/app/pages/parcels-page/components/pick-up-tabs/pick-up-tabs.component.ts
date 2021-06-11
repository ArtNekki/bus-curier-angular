import { Component, OnInit } from '@angular/core';
import pickupPoints from '../../../../mock-data/pickup-points';

@Component({
  selector: 'app-pick-up-tabs',
  templateUrl: './pick-up-tabs.component.html',
  styleUrls: ['./pick-up-tabs.component.scss']
})
export class PickUpTabsComponent implements OnInit {
  public tabsMap = {
    BoxBerry: 'BoxBerry',
    IML: 'IML',
    Hermes: 'Hermes',
    Kce: 'Kce'
  }

  public pickupPoints = pickupPoints;
  public activeTab = this.tabsMap.BoxBerry;

  constructor() { }

  ngOnInit(): void {
  }

  showTab(tab) {
    this.activeTab = tab;
  }
}
