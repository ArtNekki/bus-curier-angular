import { Component, OnInit } from '@angular/core';
import pickupPoints from '../../../../mock-data/pickup-points';
import dropdown from '../../../../core/animations/dropdown';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-pick-up-tabs',
  templateUrl: './pick-up-tabs.component.html',
  styleUrls: ['./pick-up-tabs.component.scss'],
  animations: [
    trigger('activeTab', [
      transition('void => *', [
        // style({opacity: 0, height: '0px'}),
        style({opacity: 0}),
        animate('300ms')
      ])
    ])
  ]
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

  showTab(tab, btn) {
    this.activeTab = tab;
    // btn.scrollTo(0, btn.getBoundingClientRect().top);
    btn.scrollIntoView({block: 'start',  behavior: 'smooth'});
  }

  setIcon(point: any) {
    return `assets/img/svg/${this.activeTab === point ? 'caret-up' : 'caret-down'}.svg`;
  }
}
