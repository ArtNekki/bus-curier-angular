import { Component, OnInit } from '@angular/core';
import cities from '../../mock-data/cities';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit {

  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

}
