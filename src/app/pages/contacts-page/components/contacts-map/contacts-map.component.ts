import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';

@Component({
  selector: 'app-contacts-map',
  templateUrl: './contacts-map.component.html',
  styleUrls: ['./contacts-map.component.scss']
})
export class ContactsMapComponent implements OnInit {
  public points = [];
  public currentPoint = null;
  public mapZoom = 6;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.contactsService.offices$
      .subscribe((offices) => {
        this.points = offices;
      });

    this.contactsService.currentOfficeId$
      .subscribe((id: string) => {
        if (id) {
          this.currentPoint = this.points.filter((point) => point.id === id);
          this.currentPoint = this.currentPoint.length ? this.currentPoint[0] : null;
          this.mapZoom = 15;
        }
      });
  }

  pointClick(id: string) {
    const arr = this.points.filter((point) => point.id === id);
    this.contactsService.currentOffice$.next(arr.length ? arr[0] : null);
  }
}
