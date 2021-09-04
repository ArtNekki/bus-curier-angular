import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import FormControlName from 'src/app/core/maps/FormControlName';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {CalculatorService} from '../../../../../../core/services/calculator/calculator.service';
import CityTo from '../../../../../../core/models/CityTo';
import CargoType from '../../../../../../core/models/CargoType';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit, OnDestroy {
  @Input() data;

  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  public Label = {
    [FormControlName.Fio]: 'ФИО',
    [FormControlName.FirstName]: 'Имя',
    [FormControlName.MiddleName]: 'Отчество',
    [FormControlName.LastName]: 'Фамилия',
    [FormControlName.Role]: 'Роль',
    [FormControlName.Tel]: 'Телефон',
    [FormControlName.Email]: 'Email',
    [FormControlName.Date]: 'Дата',
    [FormControlName.Location]: 'Город',
    [FormControlName.Give]: 'Сдать в отделение',
    [FormControlName.Pickup]: 'Вызвать курьера',
    [FormControlName.Get]: 'Забрать в отделении',
    [FormControlName.Delivery]: 'Вызвать курьера',
    [FormControlName.NeedToMeet]: 'Встретить с автобуса',
    [FormControlName.Doc]: 'Документ',
    [FormControlName.RusPassport]: 'Паспорт РФ',
    [FormControlName.Box]: 'Коробка',
    [FormControlName.PlasticPack]: 'Пластиковый пакет',
    [FormControlName.SafePack]: 'Сейф-пакет',
    [FormControlName.Packaging]: 'Упаковка',
    [FormControlName.Skin]: 'Пленка',
    [FormControlName.Other]: 'Другое',
    [FormControlName.Services]: 'Услуги',
    [FormControlName.Street]: 'Улица',
    [FormControlName.Building]: 'Строение',
    [FormControlName.Apartment]: 'Квартира',
    [FormControlName.CourierTime]: 'Время приезда курьера',
    [FormControlName.Address]: 'Адрес',
    ['office']: 'Отделение',
  };

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

  public types = [];
  private typesSub: Subscription;

  public services = [];
  private servicesSub: Subscription;

  public cities = [];
  private citiesSub: Subscription;

  constructor(
    private calcService: CalculatorService,
    public formUtils: FormUtilsService) { }

  ngOnInit(): void {
    this.citiesSub = this.calcService.getCityTo('1', 0)
      .subscribe((cities: Array<CityTo>) => {
        if (cities.length) {
          cities.forEach((city: any) => {
            this.cities[city.id] = city;
          });
        }
      });

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

  ngOnDestroy(): void {
    this.typesSub.unsubscribe();
    this.servicesSub.unsubscribe();
    this.citiesSub.unsubscribe();
  }

  get author() {
    const author = this.data.author;

    return this.formatData(author[author.active]);
  }

  get sender() {
    return this.formatData(this.data.sender);
  }

  get recipient() {
    return this.formatData(this.data.recipient);
  }

  // get services() {
  //   const data = this.data.steps[2][FormControlName.Services];
  //
  //   if (!data) {
  //     return;
  //   }
  //
  //   return Object.entries(data).map((el) => {
  //     return {name: this.FormFieldMeta[el[0]].label, value: Object.values(el[1])[1]};
  //   });
  // }

  get departurePoint() {
    const data =  this.data[FormControlName.DeparturePoint];

    if (!data) {
      return;
    }

    let result;

    const options = data[FormControlName.Options];
    const target = options[options.active];

    switch (options.active) {
      case FormControlName.Give:
        result = this.formatOffice(data, target);
        break;
      case FormControlName.Pickup:
        result = this.formatCourier(data, target);
        break;
    }

    return result;
  }

  get pickupPoint() {
    const data =  this.data[FormControlName.PickupPoint];

    if (!data) {
      return;
    }

    let result;

    const options = data[FormControlName.Options];
    const target = options[options.active];

    switch (options.active) {
      case FormControlName.Get:
        result = this.formatOffice(data, target);
        break;
      case FormControlName.Delivery:
        result = this.formatCourier(data, target);
        break;
      case FormControlName.NeedToMeet:
        result = this.formatNeedToMeet(data, target);
        break;
    }

    return result;
  }

  get orders() {
    return this.data.orders;
  }

  formatCourier(data, target) {
    const obj =
      {
        [FormControlName.Address]: `ул. ${target.street}, д. ${target.building},кв. ${target.apartment}`,
        [FormControlName.CourierTime]: target[FormControlName.CourierTime]
      };

    return this.formatPointData(Object.assign(data, obj));
  }

  formatOffice(data, target) {
    const obj = {[FormControlName.Office]: target.office};

    return this.formatPointData(Object.assign(data, obj));
  }

  formatNeedToMeet(data, target) {
    const obj = {[FormControlName.NeedToMeet]: 'Да'};
    return this.formatPointData(Object.assign(data, obj));
  }

  formatPointData(obj) {
    return Object.entries(obj)
      .map((item: [string, string]) => {
        if ((item[0] === FormControlName.Options)) {
          return null;
        } else {
          return {name: this.Label[item[0]], value: item[1]};
        }
      })
      .filter((item) => item);
  }

  setCargoType(type: any) {
    return [{name: 'Тип груза', value: type}];
  }

  formatParcel(item: any) {
    return [
      {name: 'Габариты',
        value: `
        Ширина: <b>${item.width} см</b>.,
        Высота: <b>${item.height} см</b>.,
        Длина: <b>${item.length} см</b>.`},
      {name: 'Вес', value: `${item.weight} кг.`}];
  }

  formatDocs(item: any) {
    return [{name: 'Количество', value: `${item} шт.`}];
  }

  formatAutoparts(item: any) {
    return [{name: 'Запчасть', value: item}];
  }

  formatOther(item: any) {
    return [{name: 'Другое', value: item}];
  }

  formatData(data) {
    if (!data) {
      return;
    }

    return Object.entries(data).map((item: [string, string]) => {
      return {name: this.Label[item[0]], value: item[1] || 'нет'};
    });
  }

  formatPackage(data) {
    const list = Object.entries(data)
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
      })
      .map((obj) => {
        return `${obj.type} ${obj.size} (${obj.count} шт.)`;
      });

    return [{name: 'Упаковка', value: list.join(', ')}];
  }

  formatServices(services: any) {
    if (!services.items || !services.items.length) {
      return;
    }

    const list = services.items
      .map((obj) => {
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
      .filter((item) => item)
      .map((item) => {
        return `${item.name}`;
      });

    return [{name: 'Доп. услуги', value: list.join(', ')}];
  }
}
