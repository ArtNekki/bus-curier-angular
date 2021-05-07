import { Component, OnInit } from '@angular/core';
import mainNav from '../../../../main-nav';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public  nav = mainNav;

  constructor() { }

  ngOnInit(): void {
  }

}
