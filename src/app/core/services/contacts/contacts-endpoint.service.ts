import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CityFrom, Office} from '../../interfaces/calculator';
import {EndpointFactory} from '../endpoint-factory/endpoint-factory.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsEndpointService extends EndpointFactory {

  private readonly _url: string = '/calc';

  get url() { return this.baseUrl + this._url; }

  constructor(http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  getOffices(): Observable<Office> {
    return this.execute(this.http.get<Office>(`${this.url}/getoffices`, this.getRequestHeaders()),
      () => this.getOffices());
  }
}
