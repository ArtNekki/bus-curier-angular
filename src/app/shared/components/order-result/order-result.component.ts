import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {OrderReportService} from '../../../core/services/order-report/order-report.service';
import formFieldMeta from '../../../core/form/formFieldMeta';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../core/services/form-utils.service';
import CargoType from '../../../core/models/CargoType';
import {Subscription} from 'rxjs';
import {CalculatorService} from '../../../core/services/calculator/calculator.service';
import CityTo from '../../../core/models/CityTo';
import {UtilsService} from '../../../core/services/utils.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit, OnChanges {
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() mods;
  @Input() data;

  public Cargo = {
    Docs: '1',
    Parcels: '2',
    AutoParts: '5',
    Other: '21'
  };

  public CargoName = {
    1: 'Документы',
    2: 'Посылки',
    5: 'Автозапчасти',
    21: 'Другое'
  };

  public OptionName = {
    give: 'Cдать в отделение',
    pickup: 'Вызвать курьера',
    get: 'Забрать в отделении',
    delivery: 'Вызвать курьера',
    'need-to-meet': 'Встерить с автобуса'
  };

  private PackageName = {
    1: 'Коробка',
    2: 'Сейф-пакет',
    3: 'Пластиковый пакет',
    4: 'Другое',
    5: 'Другое',
    6: 'Пленка'
  };

  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public cssClass;
  public currentData;
  public isLoading = false;
  public isDirty = false;

  private types = {};
  private services = {};
  public cities = {};

  constructor(
    public orderReport: OrderReportService,
    public formUtils: FormUtilsService,
    public utils: UtilsService,
    private localStorage: LocalStorageService,
    private modsService: ModsService) {

    this.cssClass = this.modsService.setMods('order-result', this.mods);
  }

  ngOnInit(): void {

    if (this.localStorage.get('cities')) {
      const cities = this.localStorage.get('cities');

      cities.forEach((city: any) => {
        this.cities[city.id] = city;
      });
    }

    if (this.localStorage.get('types')) {
      const types = this.localStorage.get('types');

      types.forEach((type: any) => {
        this.types[type.id] = type;
      });
    }

    if (this.localStorage.get('services')) {
      const services = this.localStorage.get('services');

      services.forEach((service: any) => {
        this.services[service.id] = service;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.data.currentValue) {
      this.currentData = changes.data.currentValue;
    }
  }

  //
  getOrders(data) {
    return data.orders.orders;
  }

  formatOrder(order: any) {
    console.log('order', order);
  }

  getCargo(data) {
    console.log('cargo', data);
  }

  formatDocs(data: any) {
    return `Документы (мест: ${data[FormControlName.Counter]})`;
  }

  formatParcels(arr: any) {
    return `Посылки (мест: ${arr.length} шт)`;
  }

  formatAutoparts(obj: any) {
    return `Автозапчасть: ${this.types[obj.item].name} (${obj.counter}шт.)`;
  }

  formatOther(obj: any) {
    return `Другое: ${this.types[obj.item].name} (${obj.counter}шт.)`;
  }

  formatPackage(arr) {
    const list = Object.entries(arr)
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

            return {
              id,
              name: this.services[id].name,
              count: obj.counter,
              price: this.services[id].price,
              params: this.services[id].property,
              type: this.PackageName[this.services[id].subgroup_id],
              size: this.services[id].site_name
            };
           });

    return list;
  }

  formatServices(services: any) {
    if (!services.items || !services.items.length) {
      return;
    }

    const list = services.items.map((obj) => {
      const selected = Object.values(obj)[0];
      const id = Object.keys(obj)[0];
      const value = Object.values(obj)[1];

      return selected ? {
        id,
        value,
        name: this.services[id].name,
        price: this.services[id].price,
      } : null;
    })
      .filter((item) => item);

    return list;
  }

  formatCityFrom(data) {
    const id = data[FormControlName.DeparturePoint].location;
    return this.cities[id].name;
  }

  formatCityTo(data) {
    const id = data[FormControlName.PickupPoint].location;
    return this.cities[id].name;
  }

  formatDepartureOption(data) {
    const options = data[FormControlName.DeparturePoint].options;
    return {
      type: options.active,
      price: 300
    };
  }

  formatPickupOption(data) {
    const options = data[FormControlName.PickupPoint].options;
    return {
      type: options.active,
      price: 300
    };
  }

  //
  // getDepartureCity(data) {
  //   return data.steps[1][FormControlName.DeparturePoint].location;
  // }
  //
  // getPickupCity(data) {
  //   return data.steps[2][FormControlName.PickupPoint].location;
  // }
  //
  // getDispatchType(data) {
  //   const dispatchData = data.steps[1][FormControlName.DeparturePoint][FormControlName.DispatchData];
  //
  //   if (!dispatchData) {
  //     return;
  //   }
  //
  //   return dispatchData[FormControlName.Active];
  // }
  //
  // getReceiveType(data) {
  //   const pickupData = data.steps[2][FormControlName.PickupPoint][FormControlName.ReceiveData];
  //
  //   if (!pickupData) {
  //     return;
  //   }
  //
  //   return pickupData[FormControlName.Active];
  // }
  //
  //
  //
  // formatParcels(arr: any) {
  //   return `Посылки (мест: ${arr.length} шт)`;
  // }
  //
  // formatAutoparts(item: any) {
  //   if (!item) {
  //     return;
  //   }
  //
  //   return item.join(', ');
  // }
  //
  // formatCargo(cargo: any) {
  //   let result = null;
  //
  //   switch (cargo.activeItem) {
  //     case FormControlName.Docs:
  //       result = this.formatDocs(cargo.items[FormControlName.Docs]);
  //       break;
  //     case FormControlName.Parcels:
  //       result = this.formatParcels(cargo.items[FormControlName.Parcels]);
  //       break;
  //     case FormControlName.AutoParts:
  //       result = this.formatAutoparts(cargo.items[FormControlName.AutoParts]);
  //       break;
  //   }
  //
  //   return result;
  // }
  //
  // formatPackaging(data) {
  //   const packaging = data.steps[2][FormControlName.Package];
  //
  //   if (!packaging) {
  //     return;
  //   }
  //
  //   const result = packaging.items
  //     .filter((item) => {
  //       return item.counter > 0 && item;
  //     })
  //     .map((el) => {
  //       const label = this.FormFieldMeta[Object.keys(el)[0]].label;
  //       return {label: label.toString(), count: `(${el.counter} шт.)`, sum: `120 руб.`};
  //     });
  //
  //   return result;
  // }
  //
  // formatServices(data) {
  //   const services = data.steps[2][FormControlName.Services];
  //
  //   if (!services) {
  //     return;
  //   }
  //
  //   const result = Object.entries(services).map((el) => {
  //     return {id: el[0], label: this.FormFieldMeta[el[0]].label, value: Object.values(el[1])[1], sum: '200 руб.'};
  //   });
  //
  //   return result;
  // }

}
