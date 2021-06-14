import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss'],
  animations: [
    trigger('activePanel', [
      transition('void => *', [
        // style({opacity: 0, height: '0px'}),
        style({height: '0px'}),
        animate('300ms')
      ])
    ])
  ]
})
export class PickupComponent implements OnInit {
  @Input() data;

  public activePanel = null;

  constructor() { }

  ngOnInit(): void {
    this.activePanel = this.data[0];
  }

  showContacts(data) {
    this.activePanel = data;
  }

  setIcon(city: string) {
    return `assets/img/svg/${this.activePanel === city ? 'minus' : 'plus'}.svg`;
  }
}
