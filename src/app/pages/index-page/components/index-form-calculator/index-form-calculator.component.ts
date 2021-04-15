import { Component, OnInit } from '@angular/core';
import cities from '../../../../mock-data/cities';

@Component({
  selector: 'app-index-form-calculator',
  templateUrl: './index-form-calculator.component.html',
  styleUrls: ['./index-form-calculator.component.scss']
})
export class IndexFormCalculatorComponent implements OnInit {

  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

}
