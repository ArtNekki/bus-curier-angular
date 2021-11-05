import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
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
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() cities;

  public activePanel = null;
  public breakpoint = null;
  public minWidthMD = false;

  constructor() { }

  ngOnInit(): void {
    this.breakpoint = window.matchMedia(`(min-width: ${media.MD}px)`);
    this.breakpoint.addListener(this.checkScreen.bind(this));
    this.checkScreen();

    this.cities = this.cities
      .map((city) => {
          return {
            office_id: city.office_id,
            name: city.name,
            coords: [{
              geo_x: +city.geo_x,
              geo_y: +city.geo_y
            }],
            points: [
              [
                {
                  label: 'Адрес:',
                  text: city.address
                },
                {
                  label: 'Режим работы:',
                  text: city.worktime
                }
              ]
            ]
          };
      })
      .sort((a: any, b: any) => {
        return a.office_id.localeCompare(b.office_id);
      });

    const vlReduced = this.cities.splice(0, 3)
      .reduce((obj, city) => {
        return {
          office_id: city.office_id,
          name: 'Владивосток',
          coords: [...obj.coords, ...city.coords],
          points: [...obj.points, ...city.points]
        };
      }, {office_id: '', name: '', coords: [], points: []});

    this.cities = [vlReduced, ...this.cities];
    this.showContacts(this.cities[0]);
  }

   checkScreen() {
    this.minWidthMD = this.breakpoint && this.breakpoint.matches;
  }

  showContacts(data) {
    this.activePanel = data;
    console.log('data', data);
    this.change.emit(data);
  }

  setIcon(city: string) {
    return `assets/img/svg/${this.activePanel === city ? 'minus' : 'plus'}.svg`;
  }
}
