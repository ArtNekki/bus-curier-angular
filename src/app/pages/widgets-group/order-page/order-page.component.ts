import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  public currentStep = 0;
  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentStep($event: any) {
    this.currentStep = $event;
  }
}
