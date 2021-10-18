import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderEndpointService} from './order-endpoint.service';
import {delay, map} from 'rxjs/operators';
import {OrderTracking} from '../../interfaces/order';
import {Observable, throwError} from 'rxjs';
import {UtilsService} from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private utilsService: UtilsService,
              private endpoint: OrderEndpointService) { }

  getDetails(id) {
    return this.endpoint.getDetails(id);
  }

  getTracking(id): Observable<OrderTracking[]> {
    return this.endpoint.getTracking(id)
      .pipe(
        delay(1000),
        map((data: OrderTracking[]) => {
          if (!data.push) {
            throw new Error('Not found');
          } else{
            return data;
          }
        }));
  }

  sendOrder(data) {
    return this.endpoint.sendOrder(data)
      .pipe(
        delay(2000),
        map((result: any) => {
          if (!this.utilsService.getObjectKey(result).length) {
            throw new Error(result);
          } else {
            return result;
          }
        })
      );
  }
}
