import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';
import {delay, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Office} from '../../../../core/interfaces/calculator';

@Component({
  selector: 'app-point-card',
  templateUrl: './point-card.component.html',
  styleUrls: ['./point-card.component.scss']
})
export class PointCardComponent implements OnInit, OnDestroy {
  public data: Office = null;
  private dataSub: Subscription;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.dataSub = this.contactsService.currentOffice$
      .pipe(
        tap(() => this.data = null),
        // delay(500)
      )
      .subscribe((data: Office) => {
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

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }
}
