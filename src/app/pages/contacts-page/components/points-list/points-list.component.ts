import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';
import {debounceTime, delay, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {Office} from '../../../../core/interfaces/calculator';
import {NgxTippyProps} from 'ngx-tippy-wrapper';

@Component({
  selector: 'app-points-list',
  templateUrl: './points-list.component.html',
  styleUrls: ['./points-list.component.scss']
})
export class PointsListComponent implements OnInit, OnDestroy {
  public offices: Office[];
  private officesSub: Subscription;
  public isLoading = false;
  public tippyProps: NgxTippyProps = {
    theme: 'light',
    placement: 'bottom'
  };

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.officesSub = this.contactsService.offices$
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.offices = [];
        }),
        debounceTime(500),
        delay(500)
      )
      .subscribe((offices: Office[]) => {
        if (offices.length) {
          this.offices = offices;
          this.isLoading = false;
        }
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
