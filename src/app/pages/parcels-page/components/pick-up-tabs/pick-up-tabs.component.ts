import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-up-tabs',
  templateUrl: './pick-up-tabs.component.html',
  styleUrls: ['./pick-up-tabs.component.scss']
})
export class PickUpTabsComponent implements OnInit {
  public tabsMap = {
    BoxBerry: 'boxBerry',
    Iml: 'iml',
    Hermes: 'hermes',
    Kce: 'kce'
  }

  public activeTab = this.tabsMap.BoxBerry;

  constructor() { }

  ngOnInit(): void {
  }

  showTab(tab) {
    this.activeTab = tab;
  }
}
