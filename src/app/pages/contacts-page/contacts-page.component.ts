import { Component, OnInit } from '@angular/core';
import cities from '../../mock-data/cities';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

}
