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
          points: [...obj.points, ...city.points]
        };
      }, {office_id: '', name: '', points: []});

    this.cities = [vlReduced, ...this.cities];
    this.activePanel = this.cities[0];
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
