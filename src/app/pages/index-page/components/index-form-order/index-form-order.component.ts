import { Component, OnInit } from '@angular/core';
import cities from '../../../../mock-data/cities';

@Component({
  selector: 'app-index-form-order',
  templateUrl: './index-form-order.component.html',
  styleUrls: ['./index-form-order.component.scss']
})
export class IndexFormOrderComponent implements OnInit {

  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

}
