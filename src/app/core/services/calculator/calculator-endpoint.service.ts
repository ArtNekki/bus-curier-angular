import {Injectable, Injector} from '@angular/core';
import {EndpointFactory} from '../endpoint-factory/endpoint-factory.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CalculatorEndpointService extends EndpointFactory {
  private readonly _url: string = '/calc';

  get url() { return this.baseUrl + this._url; }

  constructor(http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  getDistricts<T>(id: string): Observable<T> {
    console.log('${this.url}/getdistricts/${id}', `${this.url}/getdistricts/${id}`);
    return this.execute(this.http.get<T>(`${this.url}/getdistricts/${id}`, this.getRequestHeaders()),
      () => this.getDistricts(id));
  }

  // getTaskAllAmountEndpoint<T>(start: Date, end: Date): Observable<T> {
  //   const filter = { start: start, end: end };
  //   return this.execute(this.http.post<T>(`${this.url}/task-all-amount`, JSON.stringify(filter), this.getRequestHeaders()),
  //     () => this.getTaskAllAmountEndpoint(start, end));
  // }

  // getTaskAllContractsEndpoint<T>(start: Date, end: Date): Observable<T> {
  //   const filter = { start: start, end: end };
  //   return this.execute(this.http.post<T>(`${this.url}/task-all-contracts`, JSON.stringify(filter), this.getRequestHeaders()),
  //     () => this.getTaskAllContractsEndpoint(start, end));
  // }

  // getDashboardDataEndpoint<T>(): Observable<T> {
  //   return this.execute(this.http.post<T>(`${this.url}/dashboard`, null, this.getRequestHeaders()),
  //     () => this.getDashboardDataEndpoint());
  // }

  // getTaskAggregateEndpoint<T>(start: Date, end: Date, legalEntity: number, participant: string, napravl?: number[], goscont?: string): Observable<T> {
  //   const filter = { start: start, end: end, legalEntityId: legalEntity, participantId: participant, napravlID: napravl, gosocontID: goscont };
  //   return this.execute(this.http.post<T>(`${this.url}/task-aggregate`, JSON.stringify(filter), this.getRequestHeaders()),
  //     () => this.getTaskAggregateEndpoint(start, end, legalEntity, participant, napravl, goscont));
  // }

  // getManagerWorkEndpoint<T>(managers, start, end): Observable<T> {
  //
  //   const filter = { managers: managers, start: start, end: end };
  //
  //   return this.execute(this.http.post<T>(`${this.url}/manager-work`, JSON.stringify(filter), this.getRequestHeaders()),
  //     () => this.getManagerWorkEndpoint(managers, start, end));
  // }
}
