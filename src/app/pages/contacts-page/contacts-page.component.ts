import {Component, OnDestroy, OnInit} from '@angular/core';
import cities from '../../mock-data/cities';
import {ContactsService} from '../../core/services/contacts/contacts.service';
import {Select} from '../../core/interfaces/form';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  public cities = [];
  public offices = [];
  public officesSub: Subscription;

  constructor(public contactsService: ContactsService) { }

  ngOnInit(): void {
    this.contactsService.getOffices()
      .subscribe((data: any) => {
        this.offices = data.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });

        this.contactsService.offices$.next(this.offices);

        this.cities = [...new Set(data.map(el => el.office_id))]
          .map((id) => {
            return {
              value: id,
              name: id === '8' ? data.find((el) => el.office_id === id).name.split(' ')[0] : data.find((el) => el.office_id === id).name
            };
          });

        this.cities = this.cities.sort((a: Select, b: Select) => {
          return a.name.localeCompare(b.name);
        });
      });
  }

  setCurrentCity(id: string) {
    this.contactsService.offices$.next(this.offices.filter((office) => office.office_id === id));
  }

  filterBy(type: string) {
    if (!type) {
      this.contactsService.offices$.next(this.offices);
    } else {
      this.contactsService.offices$.next(this.offices.filter((office) => +office[type]));
    }
  }

  ngOnDestroy(): void {
    this.officesSub.unsubscribe();
  }
}
