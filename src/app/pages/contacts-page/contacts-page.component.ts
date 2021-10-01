import { Component, OnInit } from '@angular/core';
import cities from '../../mock-data/cities';
import {ContactsService} from '../../core/services/contacts/contacts.service';
import {Select} from '../../core/interfaces/form';

@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.scss']
})
export class ContactsPageComponent implements OnInit {
  public cities = [];
  public offices = [];
  public filteredOffices = [];

  public currentCityId = '';
  public currentOfficeId = '';
  public currentOffice = '';

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
    this.contactsService.getOffices()
      .subscribe((data: any) => {
        this.offices = data.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });

        this.filteredOffices = this.offices;

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

        console.log('this.offices', this.cities);
      });
  }

  setCurrentCity(id: string) {
    this.currentCityId = id;
    this.filteredOffices = this.offices.filter((office) => office.office_id === id);
  }

  setCurrentOffice(id: string) {
    this.currentOfficeId = id;
    this.currentOffice = this.getOfficeData(id);
  }

  getOfficeData(id) {
    const data = this.offices.filter((office) => {
      return office.id === id;
    });

    return data.length ? data[0] : null;
  }

  closeCard() {
    console.log('dd');
    this.currentOffice = null;
  }
}
