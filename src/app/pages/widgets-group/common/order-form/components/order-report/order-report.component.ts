import {Component, Input, OnInit} from '@angular/core';
import FormControlName from 'src/app/core/maps/FormControlName';
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.scss']
})
export class OrderReportComponent implements OnInit {
  @Input() data;

  public FormControlName = FormControlName;
  public FormFieldMeta = formFieldMeta;

  constructor(public formUtils: FormUtilsService) { }

  ngOnInit(): void {

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
        break;
      case FormControlName.Pickup:
        result = this.formatCourier(data, target, options.active);
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
        break;
      case FormControlName.Delivery:
        result = this.formatCourier(data, target, options.active);
        break;
      case FormControlName.NeedToMeet:
        break;
    }

    return result;
  }

  // get cargoList() {
  //   const cargoItems =  this.data.steps[2]['cargo-group'].items;
  //
  //   return cargoItems;
  // }

  formatData(data) {
    if (!data) {
      return;
    }

    return Object.entries(data).map((item: [string, string]) => {
      return {name: this.FormFieldMeta[item[0]].label, value: item[1] || 'нет'};
    });
  }

  setCargoType(type: any) {
    return [{name: 'Характер груза', value: type}];
  }

  formatCourier(data, target, name) {
    const address = {[FormControlName.Address]: `
      ул. ${target.street},
      д. ${target.building},
      кв. ${target.apartment}`};

    data = Object.entries(Object.assign(data, address))
      .map((item: [string, string]) => {
        if ((item[0] === FormControlName.Options)) {
          const time = item[1][item[1][FormControlName.Active]][FormControlName.CourierTime];
          return time ? {name: 'Вызов курьера', value: time} : null;
        } else {
          return {name: this.FormFieldMeta[item[0]].label, value: item[1]};
        }
      })
      .filter((item) => item);

    console.log('data 5555', data);

    return data;
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

  // get packaging() {
  //   const packaging = this.data.steps[2][FormControlName.Packaging];
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
  //       return [label.toString(), `(${el.counter} шт.)`];
  //     });
  //
  //   return [{name: 'Наименование', value: result.join(`, `)}];
  // }
}
