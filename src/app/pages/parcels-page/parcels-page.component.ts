import { Component, OnInit } from '@angular/core';
import {pickPoints, shops} from '../../mock-data/slider';

@Component({
  selector: 'app-parcels-page',
  templateUrl: './parcels-page.component.html',
  styleUrls: ['./parcels-page.component.scss']
})
export class ParcelsPageComponent implements OnInit {

  public shops = shops;
  public pickPoints = pickPoints;

  constructor() { }

  ngOnInit(): void {
  }

}
