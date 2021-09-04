import { Component, OnInit } from '@angular/core';
import {SimpleModalService} from 'ngx-simple-modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fail-page',
  templateUrl: './fail-page.component.html',
  styleUrls: ['./fail-page.component.scss']
})
export class FailPageComponent implements OnInit {

  constructor(
    private modalService: SimpleModalService,
    private router: Router) { }

  ngOnInit(): void {
  }

  goTo() {
    this.router.navigate(['orders', 'order', 'new']);
  }
}
