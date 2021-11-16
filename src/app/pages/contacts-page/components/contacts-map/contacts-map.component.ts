import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';
import {Subscription} from 'rxjs';
import {Office} from '../../../../core/interfaces/calculator';
import {debounceTime, delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-contacts-map',
  templateUrl: './contacts-map.component.html',
  styleUrls: ['./contacts-map.component.scss']
})
export class ContactsMapComponent implements OnInit, OnDestroy {
  public points: Office[] = [];
  public currentPoint: any = null;
  private pointsSub: Subscription;
  private currentOfficeIdSub: Subscription;
  public mapZoom = 6;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.pointsSub = this.contactsService.offices$
      .pipe(debounceTime(500))
      .subscribe((offices: Office[]) => {
        this.points = offices;

        if (offices.length && (offices.length <= 3)) {
          this.mapZoom = 12;
        } else {
          this.mapZoom = 6;
        }
      });

    this.currentOfficeIdSub = this.contactsService.currentOfficeId$
      .subscribe((id: string) => {
        if (id) {
          this.currentPoint = this.points.filter((point: Office) => point.id === id);
          this.currentPoint = this.currentPoint.length ? this.currentPoint[0] : null;
          this.mapZoom = 15;
        }
      });
  }

  pointClick(id: string) {
    const arr = this.points.filter((point: Office) => point.id === id);
    this.contactsService.currentOffice$.next(arr.length ? arr[0] : null);
  }

  ngOnDestroy(): void {
    this.pointsSub.unsubscribe();
    this.currentOfficeIdSub.unsubscribe();
  }

  toggleFullMode(show) {
    if (show) {
      document.documentElement.classList.add('page--full-mode');
      this.mapZoom = 7;
    } else {
      document.documentElement.classList.remove('page--full-mode');
      this.mapZoom = 6;
    }
  }
}
