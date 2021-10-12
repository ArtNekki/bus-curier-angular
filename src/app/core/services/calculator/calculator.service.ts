import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalculatorEndpointService} from './calculator-endpoint.service';
import {BehaviorSubject, Observable, of, zip} from 'rxjs';
import FormControlName from '../../maps/FormControlName';
import {delay, map, reduce, tap} from 'rxjs/operators';
import {CityFrom, Office, Parcel} from '../../interfaces/calculator';
import {Cargo} from '../../maps/order';

interface TotalSum {
  price: number;
}

@Injectable({
  providedIn: 'root'
})

export class CalculatorService {
  public courierDelivery$ = new BehaviorSubject('');

  Service = {
    SMS: '66',
    EXT_SMS: '65',
    INSURANCE_15: '58',
    INSURANCE_30: '59',
    INSURANCE: 'insurance'
  };

  public Insurance = {
    LIMIT_MIN: 15000,
    PRICE_MIN: 50,
    PRICE_MAX: 100
  };

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

  calculateTotalSum({cityFromId, cityToId, courierFromId, courierToId, orders}) {
    const arr = [];
    const ordersCount = orders.length;

    orders.forEach((order) => {
      arr.push(this.calculateOrderSum(cityFromId, cityToId, courierFromId, courierToId, order));
    });

    return zip(...arr)
      .pipe(
        map((prices: Array<TotalSum>) => {
          const success = prices.every(({price}: TotalSum) => price > 0);
          let totalSum: any;

          if (success) {
            totalSum = prices.reduce((sum, {price}) => {
              return +sum + +price;
            }, 0);
          } else {
            totalSum = 0;
          }

          return totalSum;
        })
      );
  }

  calculateOrderSum(cityFromId, cityToId, courierFromId, courierToId, order): Observable<TotalSum> {
    let cargoId = order.activeCargo;
    let result = null;
    let places = 0;

    if (!order.cargo) {
      return new Observable<TotalSum>();
    }

    const cargo = order.cargo[cargoId];

    if (cargoId === Cargo.Docs) {
      cargoId = `${cargoId}, ${cargo.counter}`;
      places = cargo.counter;
    }

    if (cargoId === Cargo.AutoParts || cargoId === Cargo.Other) {
      cargoId = `${cargo.item}, ${cargo.counter}`;
      places = cargo.counter;
    }

    let servicesId = this.getServicesId(order);
    servicesId = [courierToId, courierFromId, ...servicesId]
      .filter((id) => id);

    if (cargoId === Cargo.Parcels) {
      result = this.getParcelsSum(cityFromId, cityToId, cargoId, servicesId, cargo);
    } else {
      result = cargo.counter
        ? this.getResult(cityFromId, cityToId, cargoId, servicesId, 0, 0)
        : of({price: 0});
    }

    return result;
  }

  getParcelsSum(cityFromId, cityToId, cargoId, servicesId, cargo) {
    const weight = this.getWeight(cargo);
    const dim = this.getDim(cargo);
    const places = this.getParcelPlaces(cargo);

    const isWidthCorrect = this.checkParcelParams(cargo, 'width');
    const isHeightCorrect = this.checkParcelParams(cargo, 'height');
    const isPlacesCorrect = this.checkParcelParams(cargo, 'place-count');
    const isLengthCorrect = this.checkParcelParams(cargo, 'length');
    const isWeightCorrect = this.checkParcelParams(cargo, 'weight');

    const paramsSuccess = [isWidthCorrect, isHeightCorrect, isPlacesCorrect, isLengthCorrect, isWeightCorrect]
      .every((param: boolean) => param);

    // console.log('isWidthCorrect', isWidthCorrect);
    // console.log('isHeightCorrect', isHeightCorrect);
    // console.log('isPlacesCorrect', isPlacesCorrect);
    // console.log('isLengthCorrect', isLengthCorrect);
    // console.log('isWeightCorrect', isWeightCorrect);

    const sumWithoutServices = paramsSuccess ? this.getResult(cityFromId, cityToId, cargoId, null, weight, dim)
      .pipe(
        map(({price}) => {
          return { price: price * places };
        })
      ) : of({price: 0});

    const sumWithoutParcels = paramsSuccess ?
      this.getResult(cityFromId, cityToId, 0, servicesId, 0, 0) : of({price: 0});

    return zip(sumWithoutServices, sumWithoutParcels)
      .pipe(
        map((arr: Array<TotalSum>) => {

          const sum = arr.reduce((acc, {price}) => {
            return acc + price;
          }, 0);

          return {price: sum};
        }, 0)
      );
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

  checkParcelParams(cargo: Parcel[], param: string) {
    if (!cargo) {
      return 0;
    }

    return cargo
      .map((obj: Parcel) => {
        return obj[param];
      })
      .every((num: number) => num > 0);
  }

  getParcelPlaces(cargo: Parcel[]) {
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
        const id = Object.entries(obj)[0][0];
        const checked = Object.entries(obj)[0][1];

        const formattedId = (id === 'insurance' && obj.sum)
          ? obj.sum.split(' ').join('') >= this.Insurance.LIMIT_MIN
            ? this.Service.INSURANCE_30 : this.Service.INSURANCE_15 : id;

        return checked ?  formattedId : null;
      })
      .filter((id) => id);

    return [...packageIds, ...servicesIds];
  }
}
