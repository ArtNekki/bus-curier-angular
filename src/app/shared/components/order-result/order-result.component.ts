import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import formFieldMeta from '../../../core/form/formFieldMeta';
import FormControlName from 'src/app/core/maps/FormControlName';
import {FormUtilsService} from '../../../core/services/form-utils.service';
import {UtilsService} from '../../../core/services/utils.service';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {Cargo, OptionName, PackageName} from '../../../core/maps/order';
import {Parcel} from '../../../core/interfaces/calculator';

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

  private Courier = {
    pickup: '1',
    delivery: '2'
  };

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
    return `Посылки (${arr.length} шт)`;
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
      const value: string | any = Object.values(obj)[1];

      const formattedId = id === 'insurance'
        ? value.split(' ').join('') >= this.Insurance.LIMIT_MIN
          ? this.Service.INSURANCE_30 : this.Service.INSURANCE_15 : id;

      return selected ? {
        id: formattedId,
        value,
        name: this.services[formattedId].name,
        price: this.services[formattedId].price,
      } : null;
    })
      .filter((item) => item);

    return list;
  }

  formatCityFrom(data) {
    const id = data[FormControlName.DeparturePoint].location;
    return this.cities[id] ? this.cities[id].name : '';
  }

  formatCityTo(data) {
    const id = data[FormControlName.PickupPoint].location;
    return this.cities[id] ? this.cities[id].name : '';
  }

  formatDepartureOption(data) {
    const FREE_PLACES = 5;

    const extraPrice = 50;
    const orders = data.orders.orders;

    const options = data[FormControlName.DeparturePoint].options;
    const courier = this.Courier[options.active];
    let courierData = null;

    if (courier) {
      courierData = this.services[courier];
    }

    console.log('courierData', courierData);

    const allPlacesCount = this.calcAllCargosPlacesCount(orders);
    const extraPlacesSum = allPlacesCount > FREE_PLACES ? (allPlacesCount - FREE_PLACES) * extraPrice : 0;

    // console.log('extraPlaceSum', extraPlacesSum);

    return {
      type: options.active,
      price: courierData ? +courierData.price + extraPlacesSum : 0
    };
  }

  formatPickupOption(data) {
    const options = data[FormControlName.PickupPoint].options;
    return {
      type: options.active,
      price: ''
    };
  }

  calcAllCargosPlacesCount(orders) {
    const allPlacesCount = orders.reduce((sum, order) => {
      return sum + this.calcCargoPlaces(order.cargo);
    }, 0);

    return allPlacesCount;
  }

  calcCargoPlaces(cargo) {
    return Object.values(cargo).reduce((sum, value: Parcel[] | any) => {
      const count = value ? value.length ? this.calcParcelPlaces(value) : value.counter : 0;
      return sum + count;
    }, 0);
  }

  calcParcelPlaces(cargo: Parcel[]) {
    if (!cargo) {
      return 0;
    }

    return cargo.reduce((sum, obj) => sum + +obj['place-count'], 0);
  }
}
