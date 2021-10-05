import {Component, OnDestroy, OnInit} from '@angular/core';
import cities from '../../mock-data/cities';
import {ContactsService} from '../../core/services/contacts/contacts.service';
import {Select} from '../../core/interfaces/form';
import {Subscription} from 'rxjs';
import {Office} from '../../core/interfaces/calculator';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  public cityControl: FormControl;
  private cityControlSub: Subscription;
  public cities: Select[] | Array<any> = [];
  private currentFilterType = null;
  public offices: Office[] = [];
  private filteredOffices: Office[] = [];
  public officesSub: Subscription;

  public Filter = {
    All: null,
    Pickup: 'pickup',
    Delivery: 'delivery',
    Office: 'office'
  };

  constructor(public contactsService: ContactsService) { }

  ngOnInit(): void {
    this.cityControl = new FormControl('');

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

        this.cities = [{value: '', name: 'Все города'}, ...this.cities];

        setTimeout(() => {
          this.cityControl.setValue(this.cities[0].value);
        }, 0);
      });

    this.cityControlSub = this.cityControl.valueChanges
      .subscribe((id: string) => {
        this.filteredOffices = id
          ? this.offices.filter((office: Office) => office.office_id === id) : this.offices;
        this.contactsService.offices$.next(this.filteredOffices);

        this.filterBy(this.currentFilterType);
        this.contactsService.currentOffice$.next(null);
      });
  }

  filterBy(type: string) {
    this.currentFilterType = type;
    this.filteredOffices = this.cityControl.value
      ? this.offices.filter((office: Office) => office.office_id === this.cityControl.value) : this.offices;

    if (type === this.Filter.Office) {
      this.filteredOffices = this.filteredOffices.filter((office: Office) => office.id === '1');
    } else if (type && type !== this.Filter.Office) {
      this.filteredOffices
        = this.filteredOffices.filter((office: Office) => +office[type]);
    }

    this.contactsService.offices$
      .next(this.filteredOffices);
    this.contactsService.currentOffice$.next(null);
  }

  ngOnDestroy(): void {
    this.officesSub.unsubscribe();
    this.cityControlSub.unsubscribe();
  }
}
