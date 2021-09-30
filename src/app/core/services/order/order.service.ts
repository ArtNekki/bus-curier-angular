import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderEndpointService} from './order-endpoint.service';
import {map} from 'rxjs/operators';
import {OrderTracking} from '../../interfaces/order';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private endpoint: OrderEndpointService) { }

  getDetails(id) {
    return this.endpoint.getDetails(id);
  }

  getTracking(id): Observable<OrderTracking[]> {
    return this.endpoint.getTracking(id)
      .pipe(
        map((data: OrderTracking[]) => {
          if (!data.push) {
            throw new Error('Not found');
          } else{
            return data;
          }
        }));
  }
}
