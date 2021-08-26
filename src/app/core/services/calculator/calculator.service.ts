import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculatorEndpointService} from './calculator-endpoint.service';
import {Observable} from 'rxjs';
import CityFrom from '../../models/CityFrom';
import Office from '../../models/Office';

@Injectable({
  providedIn: 'root'
})

export class CalculatorService {

  constructor(private http: HttpClient,
              private endpoint: CalculatorEndpointService) { }

  getCitiesFrom(): Observable<CityFrom> {
    return this.endpoint.getCitiesFrom();
  }

  getDistricts(id) {
    return this.endpoint.getDistricts(id);
  }

  getCityTo(cityId, districtId) {
    return this.endpoint.getCityTo(cityId, districtId);
  }

  getTypes(cityFromId, cityToId) {
    return this.endpoint.getTypes(cityFromId, cityToId);
  }

  getServices(id) {
    return this.endpoint.getServices(id);
  }

  getOffices(): Observable<Office> {
    return this.endpoint.getOffices();
  }

  getResult(cityFromId, cityToId, typeId, services, weight, dim) {
    return this.endpoint.getResult(cityFromId, cityToId, typeId, services, weight, dim);
  }
}
