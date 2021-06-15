import {Component, HostListener, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {DeviceDetectorService} from 'ngx-device-detector';
import media from '../../../../core/utils/media';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  styleUrls: ['./pickup.component.scss'],
  animations: [
    trigger('activePanel', [
      transition('void => *', [
        style({opacity: 0}),
        animate('300ms')
      ])
    ])
  ]
})
export class PickupComponent implements OnInit {
  @Input() data;

  public activePanel = null;
  public breakpoint = null;
  public minWidthMD = false;

  constructor() { }

  ngOnInit(): void {
    this.activePanel = this.data[0];

    this.breakpoint = window.matchMedia(`(min-width: ${media.MD}px)`);
    this.breakpoint.addListener(this.checkScreen.bind(this));
    this.checkScreen();
  }

   checkScreen() {
    this.minWidthMD = this.breakpoint && this.breakpoint.matches;
  }

  showContacts(data) {
    this.activePanel = data;
  }

  setIcon(city: string) {
    return `assets/img/svg/${this.activePanel === city ? 'minus' : 'plus'}.svg`;
  }
}
