import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Office} from '../../interfaces/calculator';
import { EndpointFactory } from '../endpoint-factory/endpoint-factory.service';

@Injectable({
  providedIn: 'root'
})
export class CommonEndpointService extends EndpointFactory {

  private readonly _url: string = '/site';

  get url() { return this.baseUrl + this._url; }

  constructor(http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  sendMail<T>(data): Observable<T> {
    return this.execute(this.http.post<T>(`${this.url}/mailer`, JSON.stringify(data), this.getRequestHeaders()),
      () => this.sendMail(data));
  }

  getPrivacyPolicy<T>(): Observable<T> {
    const id = '8aab09f6-c5b3-43be-8895-153ea164984e/53';

    return this.execute(this.http.get<T>(`${this.url}/page/${id}`, this.getRequestHeaders()),
      () => this.getPrivacyPolicy());
  }
}
