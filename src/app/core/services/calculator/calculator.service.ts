import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculatorEndpointService} from './calculator-endpoint.service';

@Injectable({
  providedIn: 'root'
})

export class CalculatorService {

  constructor(private http: HttpClient,
              private endpoint: CalculatorEndpointService) { }

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

  getResult(cityFromId, cityToId, typeId, services, weight, dim) {
    return this.endpoint.getResult(cityFromId, cityToId, typeId, services, weight, dim);
  }
}
