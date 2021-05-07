import { Component, OnInit } from '@angular/core';
import mainNav from '../../../../main-nav';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss']
})
export class MobileNavComponent implements OnInit {

  public  nav = mainNav;

  constructor() { }

  ngOnInit(): void {
  }

}
