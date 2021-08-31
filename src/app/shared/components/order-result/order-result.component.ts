import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {OrderReportService} from '../../../core/services/order-report/order-report.service';
import formFieldMeta from '../../../core/form/formFieldMeta';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../core/services/form-utils.service';
import CargoType from '../../../core/models/CargoType';
import {Subscription} from 'rxjs';
import {CalculatorService} from '../../../core/services/calculator/calculator.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit, OnDestroy, OnChanges {
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
  private typesSub: Subscription;

  private services = {};
  private servicesSub: Subscription;

  constructor(
    public orderReport: OrderReportService,
    public formUtils: FormUtilsService,
    private calcService: CalculatorService,
    private modsService: ModsService) {

    this.cssClass = this.modsService.setMods('order-result', this.mods);
  }

  ngOnInit(): void {
    this.typesSub = this.calcService.getTypes('1', '1')
      .subscribe((types: Array<CargoType>) => {
        if (types.length) {
          types.forEach((type: any) => {
            this.types[type.id] = type;
          });
        }
      });

    this.servicesSub = this.calcService.getServices('1')
      .subscribe((services: Array<CargoType>) => {
        if (services.length) {
          services.forEach((service: any) => {
            this.services[service.id] = service;
          });
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.data.currentValue) {
      this.currentData = changes.data.currentValue;
    }
  }

  ngOnDestroy(): void {
    this.typesSub.unsubscribe();
    this.servicesSub.unsubscribe();
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

  formatAutoparts(arr: any) {

    if (!arr.length) {
      return;
    }

    const formatted = arr.map((id) => {
      return this.types[id].name;
    }).join(`, `);

    return `Автозапчасти: ${formatted}`;
  }

  formatOther(arr: any) {

    if (!arr.length) {
      return;
    }

    const formatted = arr.map((id) => {
      return this.types[id].name;
    }).join(`, `);

    return `Другое: ${formatted}`;
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
  //   const packaging = data.steps[2][FormControlName.Packaging];
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
