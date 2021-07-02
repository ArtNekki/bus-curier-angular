import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-account-index-page',
  templateUrl: './account-index-page.component.html',
  styleUrls: ['./account-index-page.component.scss']
})
export class AccountIndexPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

  }
}
