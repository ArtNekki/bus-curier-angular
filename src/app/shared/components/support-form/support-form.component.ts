import { Component, OnInit } from '@angular/core';
import cities from '../../../mock-data/cities';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.scss']
})
export class SupportFormComponent implements OnInit {
  public cities = cities;

  constructor() { }

  ngOnInit(): void {
  }

}
