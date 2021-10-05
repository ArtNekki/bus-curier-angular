import {Component, OnDestroy, OnInit} from '@angular/core';
import cities from '../../mock-data/cities';
import {ContactsService} from '../../core/services/contacts/contacts.service';
import {Select} from '../../core/interfaces/form';
import {Subscription} from 'rxjs';
import {Office} from '../../core/interfaces/calculator';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  public cities: Select[] | Array<any> = [];
  private currentCityId = null;
  private currentFilterType = null;
  public offices: Office[] = [];
  private filteredOffices: Office[] = [];
  public defaultSelectValue = '';
  public officesSub: Subscription;

  constructor(public contactsService: ContactsService) { }

  ngOnInit(): void {
    this.officesSub = this.contactsService.getOffices()
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

        this.cities = [{value: '', name: 'Все офисы'}, ...this.cities];
        this.defaultSelectValue = this.cities[0];
      });
  }

  setCurrentCity(id: string) {
    this.currentCityId = id;
    this.filteredOffices = id ? this.offices.filter((office: Office) => office.office_id === id) : this.offices;
    this.contactsService.offices$.next(this.filteredOffices);

    this.filterBy(this.currentFilterType);
  }

  filterBy(type: string) {
    this.currentFilterType = type;
    this.filteredOffices = this.currentCityId
      ? this.offices.filter((office: Office) => office.office_id === this.currentCityId) : this.offices;

    if (type === 'office') {
      this.filteredOffices = this.filteredOffices.filter((office: Office) => office.id === '1');
    } else if (type && type !== 'office') {
      this.filteredOffices
        = this.filteredOffices.filter((office: Office) => +office[type]);
    }

    this.contactsService.offices$
      .next(this.filteredOffices);
  }

  ngOnDestroy(): void {
    this.officesSub.unsubscribe();
  }
}
