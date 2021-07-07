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
}
