import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';
import {delay, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Office} from '../../../../core/interfaces/calculator';

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.scss']
})
export class PointsListComponent implements OnInit, OnDestroy {
  public offices: Office[];
  private officesSub: Subscription;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.officesSub = this.contactsService.offices$
      .pipe(
        tap(() => this.offices = []),
        delay(1000)
      )
      .subscribe((offices: Office[]) => {
        this.offices = offices;
      });
  }

  changeOffice(id: string) {
    const arr = this.offices.filter((office: Office) => office.id === id);
    this.contactsService.currentOffice$.next(arr.length ? arr[0] : null);
  }

  ngOnDestroy(): void {
    this.officesSub.unsubscribe();
  }
}
