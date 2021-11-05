import { Component, OnInit } from '@angular/core';
import pickupPoints from '../../../../mock-data/pickup-points';
import dropdown from '../../../../core/animations/dropdown';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import media from '../../../../core/utils/media';
import { ContactsService } from 'src/app/core/services/contacts/contacts.service';
import {Subscription} from 'rxjs';
import {Office} from '../../../../core/interfaces/calculator';
import {map, take} from 'rxjs/operators';
import {UtilService} from 'angular-mydatepicker';
import { FormUtilsService } from 'src/app/core/services/form-utils.service';

const points = ['IML', 'HERMES', 'CSE', 'Boxberry'];

@Component({
  selector: 'app-pick-up-tabs',
  templateUrl: './pick-up-tabs.component.html',
  styleUrls: ['./pick-up-tabs.component.scss'],
  animations: [
    trigger('activeTab', [
      transition('void => *', [
        // style({opacity: 0, height: '0px'}),
        style({opacity: 0}),
        animate('300ms')
      ])
    ])
  ]
})
export class PickUpTabsComponent implements OnInit {
  public tabsMap = {
    BoxBerry: 'BoxBerry',
    IML: 'IML',
    Hermes: 'Hermes',
    KCE: 'Kce'
  };

  public pickupPoints = pickupPoints;
  public activeTab = '';
  public breakpoint = null;
  public minWidthMD = false;

  public points = {};
  private sub: Subscription;

  constructor(
    public utils: FormUtilsService,
    public contactsService: ContactsService) { }

  ngOnInit(): void {
    this.breakpoint = window.matchMedia(`(min-width: ${media.MD}px)`);
    this.breakpoint.addListener(this.checkScreen.bind(this));
    this.checkScreen();

    this.contactsService.getOffices()
      .pipe(
        take(1),
        map((offices: any) => {
          return offices.filter((office) => {
            return office.pvz;
          });
        }),
        map((offices: any) => {
          return points.reduce((obj, point: string) => {
            return {
              ...obj,
              [point]: offices.filter((office) => JSON.parse(office.pvz)[point])
            };
          }, {});
        })
      )
      .subscribe((obj: any) => {
        this.points = obj;
        this.activeTab = Object.keys(obj)[0];
        console.log('this.points', this.points);
      });
  }

  checkScreen() {
    this.minWidthMD = this.breakpoint && this.breakpoint.matches;
  }

  showTab(tab, btn) {
    console.log('tab', tab);
    this.activeTab = tab;
    // btn.scrollTo(0, btn.getBoundingClientRect().top);
    btn.scrollIntoView({block: 'start',  behavior: 'smooth'});
  }

  setIcon(point: any) {
    return `assets/img/svg/${this.activeTab === point ? 'caret-up' : 'caret-down'}.svg`;
  }
}
