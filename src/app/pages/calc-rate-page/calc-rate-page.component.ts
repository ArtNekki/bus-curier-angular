import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';

@Component({
  selector: 'app-calc-rate-page',
  templateUrl: './calc-rate-page.component.html',
  styleUrls: ['./calc-rate-page.component.scss']
})
export class CalcRatePageComponent implements OnInit {

  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

}
