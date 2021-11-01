import { Injectable } from '@angular/core';
import { CommonEndpointService } from './common-endpoint.service';
import {delay, map} from 'rxjs/operators';
import {OrderTracking} from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private endpoint: CommonEndpointService) {}

  sendMail(data) {
    return this.endpoint.sendMail(data)
      .pipe(
        delay(5000),
        map((result: boolean | string) => {
          if (result !== true) {
            throw new Error('Error');
          } else {
            return result;
          }
        }));
  }
}
