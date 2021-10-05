import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-point-card',
  templateUrl: './point-card.component.html',
  styleUrls: ['./point-card.component.scss']
})
export class PointCardComponent implements OnInit {
  public data: any = null;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.contactsService.currentOffice$
      .pipe(
        tap(() => this.data = null),
        delay(500)
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  showOnMap(id: string) {
    this.contactsService.currentOfficeId$.next(id);
    this.contactsService.currentOffice$.next(null);
  }

  close() {
    this.contactsService.currentOffice$.next(null);
  }
}
