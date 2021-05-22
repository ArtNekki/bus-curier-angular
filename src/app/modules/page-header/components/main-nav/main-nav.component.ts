import { Component, OnInit } from '@angular/core';
import mainNav from '../../../../main-nav';
import {animate, style, transition, trigger} from '@angular/animations';
import dropdown from '../../../../core/animations/dropdown';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  animations: [dropdown]
})
export class MainNavComponent implements OnInit {

  public  nav = mainNav;
  public activeItem = null;

  constructor() { }

  ngOnInit(): void {
  }

  showDropdown(item) {
    this.activeItem = null;
    this.activeItem = item;
  }
}
