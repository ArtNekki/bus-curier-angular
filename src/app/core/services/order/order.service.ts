import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderEndpointService} from './order-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private endpoint: OrderEndpointService) { }

  getDetails(id) {
    this.endpoint.getDetails(id);
  }

  getTracking(id) {
    this.endpoint.getTracking(id);
  }
}
