import { Component, OnInit } from '@angular/core';
import cities from 'src/app/mock-data/cities';

@Component({
  selector: 'app-account-report-page',
  templateUrl: './account-report-page.component.html',
  styleUrls: ['./account-report-page.component.scss']
})
export class AccountReportPageComponent implements OnInit {

  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

}
