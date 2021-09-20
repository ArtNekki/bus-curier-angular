import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculatorEndpointService} from './calculator-endpoint.service';
import {BehaviorSubject, Observable, zip} from 'rxjs';
import CityFrom from '../../models/CityFrom';
import Office from '../../models/Office';
import FormControlName from '../../maps/FormControlName';
import {delay, reduce} from 'rxjs/operators';
import Parcel from '../../models/Parcel';

interface TotalSum {
  price: number;
}

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

  getResult(cityFromId, cityToId, typeId, services = null, weight = null, dim = null): Observable<TotalSum> {
    return this.endpoint.getResult(cityFromId, cityToId, typeId, services, weight, dim);
  }

  calculateTotalSum({cityFromId, cityToId, orders}) {
    const arr = [];

    orders.forEach((order) => {
      arr.push(this.calculateOrderSum(cityFromId, cityToId, order));
    });

    return zip(...arr)
      .pipe(
        reduce((totalSum: number, sumArr: Array<TotalSum>) => {
          return sumArr.reduce((sum, {price}) => {
            return +sum + +price;
          }, 0);
        }, 0)
      );
  }

  calculateOrderSum(cityFromId, cityToId, order): Observable<TotalSum> {
    let cargoId = order.activeCargo;

    if (!order.cargo) {
      return new Observable<TotalSum>();
    }

    const cargo = order.cargo[cargoId];

    let dim = null;
    let weight = null;

    // if (cargoId === '1') {
    //   cargoId = Array(cargo.counter + 1).join(`${cargoId} `);
    //     // .split(' ');
    // }

    if (cargoId === '2') {
      weight = this.getWeight(cargo);
      dim = this.getDim(cargo);
    }

    if (cargoId === '5' || cargoId === '21') {
      cargoId = cargo.item;

      // cargoId = Array(cargo.counter + 1).join(`${cargo.item} `)
      //   .split(' ')
      //   .filter((el: string) => el);
    }

    const servicesId = this.getServicesId(order);

    return this.getResult(cityFromId, cityToId, cargoId, servicesId, weight, dim);
  }

  getDim(cargo: Parcel[]) {
    if (!cargo) {
      return 0;
    }

    const objSum =  cargo.reduce((acc, obj) => ({
      length: acc.length + +obj.length,
      width: acc.width + +obj.width,
      height: acc.height + +obj.height
    }), {width: 0, height: 0, length: 0});

    return Object.values(objSum)
      .reduce((sum: number, val: number) => sum + val, 0);
  }

  getWeight(cargo: Parcel[]) {
    if (!cargo) {
      return 0;
    }

    return cargo.reduce((sum: number, {weight}) => sum + +weight, 0);
  }

  getParcelCount(cargo: Parcel[]) {
    if (!cargo) {
      return 0;
    }

    return cargo.reduce((sum, obj) => sum + +obj['place-count'], 0);
  }

  getServicesId(order) {
    const packages = order.package || [];
    const services = (order.services && order.services.items) || [];

    const packageIds = Object.entries(packages)
      .map(([key, value]: [string, any]) => {
        return value.filter((item) => {
          return item.counter;
        });
      })
      .filter((array) => {
        return array.length;
      })
      .reduce((acc, val) => acc.concat(val), [])
      .map((obj) => {
        const id = Object.keys(obj)[0];
        const count = Object.values(obj)[1];

        return Array(+count + 1).join(`${id} `).split(' ');
      })
      .reduce((acc, val) => acc.concat(val), [])
      .filter((el) => el);

    const servicesIds = services
      .map((obj) => {
        return Object.entries(obj)[0][1] ?  Object.entries(obj)[0][0] : null;
      })
      .filter((id) => id);

    return [...packageIds, ...servicesIds];
  }
}
