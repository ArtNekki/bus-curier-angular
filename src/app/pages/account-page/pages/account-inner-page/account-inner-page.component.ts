import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-account-inner-page',
  templateUrl: './account-inner-page.component.html',
  styleUrls: ['./account-inner-page.component.scss']
})
export class AccountInnerPageComponent implements OnInit {
  public title: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.children[0].data.title;
  }

}
