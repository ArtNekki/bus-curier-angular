import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import {mainNav, topNav} from '../../footer-nav';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {
  public email = '';
  public topNav = topNav;
  public mainNav = mainNav;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.email = this.localStorage.get('email');
  }

}
