import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'AGM project';
  latitude = 48.5096027;
  longitude = 135.1668322;
  zoom = 16;

  constructor() { }

  ngOnInit(): void {
  }

}
