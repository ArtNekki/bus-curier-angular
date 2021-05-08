import { Component, OnInit } from '@angular/core';
import {mainNav, topNav} from '../../footer-nav';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  public topNav = topNav;
  public mainNav = mainNav;

  constructor() { }

  ngOnInit() {
  }

}
