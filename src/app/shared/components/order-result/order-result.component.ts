import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import formFieldMeta from '../../../core/form/formFieldMeta';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../core/services/form-utils.service';
import {UtilsService} from '../../../core/services/utils.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {Cargo, OptionName, PackageName} from '../../../core/maps/order';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit, OnChanges {
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input() mods;
  @Input() data;


  public FormFieldMeta = formFieldMeta;
  public FormControlName = FormControlName;

  public Cargo = Cargo;
  public OptionName = OptionName;

  public cssClass;
  public currentData;
  public isLoading = false;

  public types = {};
  public services = {};
  public cities = {};

  constructor(
    public formUtils: FormUtilsService,
    public utils: UtilsService,
    private localStorage: LocalStorageService,
    private modsService: ModsService) {

    this.cssClass = this.modsService.setMods('order-result', this.mods);
  }

  ngOnInit(): void {
    this.cities = this.formUtils.getAllCities();
    this.services = this.formUtils.getAllServices();
    this.types = this.formUtils.getAllTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.data.currentValue) {
      this.currentData = changes.data.currentValue;
    }
  }

  getOrders(data) {
    return data.orders.orders;
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
              type: PackageName[this.services[id].subgroup_id],
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
}
