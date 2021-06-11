import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss']
})
export class PickupComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
