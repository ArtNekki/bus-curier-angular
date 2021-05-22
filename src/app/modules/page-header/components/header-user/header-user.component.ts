import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
  animations: [
    trigger('dropdown', [
      transition('void => *', [
        style({opacity: 0}),
        animate('200ms')
      ])
    ])
  ]
})
export class HeaderUserComponent implements OnInit {

  public isOpen = false;
  public loggedIn = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;

    console.log('toggle', this.isOpen);
  }

}
