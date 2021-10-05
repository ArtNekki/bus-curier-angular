import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Office} from '../../interfaces/calculator';
import {ContactsEndpointService} from './contacts-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  public offices$ = new BehaviorSubject<Array<any>>([]);
  public currentOfficeId$ = new BehaviorSubject('');
  public currentOffice$ = new BehaviorSubject(null);

  constructor(private endpoint: ContactsEndpointService) { }

  getOffices(): Observable<Office> {
    return this.endpoint.getOffices();
  }
}
