import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import dropdown from '../../../../core/animations/dropdown';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss'],
  animations: [dropdown]
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
