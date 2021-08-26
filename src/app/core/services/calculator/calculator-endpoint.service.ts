import {Injectable, Injector} from '@angular/core';
import {EndpointFactory} from '../endpoint-factory/endpoint-factory.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import CityFrom from '../../models/CityFrom';
import Office from '../../models/Office';

@Injectable({
  providedIn: 'root'
})

export class CalculatorEndpointService extends EndpointFactory {
  private readonly _url: string = '/calc';

  get url() { return this.baseUrl + this._url; }

  constructor(http: HttpClient, injector: Injector) {
    super(http, injector);
  }

  getCitiesFrom(): Observable<CityFrom> {
    return this.execute(this.http.get<CityFrom>(`${this.url}/getcitiesfrom`, this.getRequestHeaders()),
      () => this.getCitiesFrom());
  }

  getDistricts<T>(id: string): Observable<T> {
    return this.execute(this.http.get<T>(`${this.url}/getdistricts/${id}`, this.getRequestHeaders()),
      () => this.getDistricts(id));
  }

  getCityTo<T>(cityId: string, distrId: string): Observable<T> {
    return this.execute(this.http.get<T>(`${this.url}/getcityto/${cityId}/${distrId}`, this.getRequestHeaders()),
      () => this.getCityTo(cityId, distrId));
  }

  getTypes<T>(cityFromId: string, cityToId: string): Observable<T> {
    return this.execute(this.http.get<T>(`${this.url}/gettypes/${cityFromId}/${cityToId}`, this.getRequestHeaders()),
      () => this.getTypes(cityFromId, cityToId));
  }

  getServices<T>(id: string): Observable<T> {
    return this.execute(this.http.get<T>(`${this.url}/getservices/${id}`, this.getRequestHeaders()),
      () => this.getServices(id));
  }

  getOffices(): Observable<Office> {
    return this.execute(this.http.get<Office>(`${this.url}/getoffices`, this.getRequestHeaders()),
      () => this.getOffices());
  }

  getResult<T>(cityFromId: string, cityToId: string,
               typeId: string, services: any, weight: any, dim: any): Observable<T> {
    return this.execute(this.http.get<T>(`${this.url}/${cityFromId}/${cityToId}/${typeId}/${services}/${weight}/${dim}`, this.getRequestHeaders()),
      () => this.getResult(cityFromId, cityToId, typeId, services, weight, dim));
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
