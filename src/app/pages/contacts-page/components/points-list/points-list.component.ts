import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';
import {delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.scss']
})
export class PointsListComponent implements OnInit {
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  public offices: Array<any>;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.contactsService.offices$
      .pipe(
        tap(() => this.offices = []),
        delay(1000)
      )
      .subscribe((offices) => {
        this.offices = offices;
      });
  }

  changeOffice(id: string) {
    const arr = this.offices.filter((office) => office.id === id);
    this.contactsService.currentOffice$.next(arr.length ? arr[0] : null);
  }
}
