import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-map',
  templateUrl: './contacts-map.component.html',
  styleUrls: ['./contacts-map.component.scss']
})
export class ContactsMapComponent implements OnInit {
  public markers = [
    { id: 'point-1', lat: 43.1488997, lng: 131.9090131 },
    {id: 'point-2', lat: 43.1592569, lng: 131.9147171 }
  ];

  public mapZoom = 13;

  constructor() { }

  ngOnInit(): void {
  }

}
