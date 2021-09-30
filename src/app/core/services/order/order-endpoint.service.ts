import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {EndpointFactory} from '../endpoint-factory/endpoint-factory.service';

@Injectable({
  providedIn: 'root'
})
export class OrderEndpointService  extends EndpointFactory {
  private readonly _url: string = '/order';

  get url() { return this.baseUrl + this._url; }

  constructor(http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  getDetails<T>(id: string): Observable<T> {
    return this.execute(this.http.get<T>(`${this.url}/getdetails/${environment.api_key}/${id}`, this.getRequestHeaders()),
      () => this.getDetails(id));
  }

  getTracking<T>(id: string): Observable<T> {
    return this.execute(this.http.get<T>(`${this.url}/gettracking/${environment.api_key}/${id}`, this.getRequestHeaders()),
      () => this.getTracking(id));
  }
}
