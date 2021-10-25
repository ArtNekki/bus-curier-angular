import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import FormControlName from 'src/app/core/maps/FormControlName';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import {LocalStorageService} from '../../../../../../core/services/local-storage.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
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
    [FormControlName.Package]: 'Упаковка',
    [FormControlName.Skin]: 'Пленка',
    [FormControlName.Other]: 'Другое',
    [FormControlName.Services]: 'Услуги',
    [FormControlName.Street]: 'Улица',
    [FormControlName.Building]: 'Строение',
    [FormControlName.Apartment]: 'Квартира',
    [FormControlName.CourierTime]: 'Время приезда курьера',
    [FormControlName.Address]: 'Адрес',
    ['office']: 'Отделение',
    [FormControlName.Sender]: 'Отправитель'
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

  public types = {};
  public services = {};
  public cities = {};
  public offices = {};

  constructor(
    private localStorage: LocalStorageService,
    public formUtils: FormUtilsService) { }

  ngOnInit(): void {
    const citiesFrom = this.localStorage.get('citiesFrom');
    const citiesTo = this.localStorage.get('citiesTo');

    if (citiesFrom && citiesTo) {
      [...citiesFrom, citiesTo].forEach((city: any) => {
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

    if (this.localStorage.get('offices')) {
      const offices = this.localStorage.get('offices');

      offices.forEach((office: any) => {
        this.offices[office.id] = office;
      });
    }
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

  get deliveryPoint() {
    const data =  this.data[FormControlName.DeliveryPoint];

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
    console.log('order-report', 'data', data);
    console.log('order-report', 'target', target);
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
          console.log('item[1]', item[0],
            (item[0] === FormControlName.Office) && item[1]
            );
          return {
            name: this.Label[item[0]],
            value: item[0] === FormControlName.Location && this.cities[item[1]] && this.cities[item[1]].name
                   || item[0] === FormControlName.Office && this.offices[item[1]] && this.offices[item[1]].address
                   || item[1]};
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

  formatAutoparts(obj: any) {
    return [{name: 'Автозапчасть', value: `${this.types[obj.item].name} (${obj.count}шт.)`}];
  }

  formatOther(obj: any) {
    return [{name: 'Другое', value: `${this.types[obj.item].name} (${obj.count}шт.)`}];
  }

  formatData(data) {
    if (!data) {
      return;
    }

    return Object.entries(data).map((item: [string, string]) => {
      return {name: this.Label[item[0]], value: this.Label[item[1]] || item[1] || 'нет'};
    });
  }

  formatPackage(data) {
    const list = Object.entries(data)
      .map(([key, value]: [string, any]) => {
        return value.filter((item) => {
          return item.count;
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
          count: obj.count,
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
