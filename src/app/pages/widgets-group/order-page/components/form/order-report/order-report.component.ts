import {Component, Input, OnInit} from '@angular/core';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import UserType from '../../../../../../core/maps/UserType';
import firebase from 'firebase';
import User = firebase.User;
import formFieldMeta from '../../../../../../core/form/formFieldMeta';
import Address from '../../../../../../core/models/Address';

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
    console.log('services', this.services);
  }

  get author() {
    const author = this.data.steps[0].author;

    return this.formatData(author[author.active]);
  }

  get sender() {
    return this.formatData(this.data.steps[1].sender);
  }

  get recipient() {
    return this.formatData(this.data.steps[2].recipient);
  }

  get services() {
    return this.formatData(this.data.steps[2].services);
  }

  get departurePoint() {
    let data =  this.data.steps[1][FormControlName.DeparturePoint];

    if (!data) {
      return;
    }

    const dispatchData = data[FormControlName.DispatchData];
    const activeDispatch = dispatchData[dispatchData.active];

    const formattedDispatch = {[dispatchData.active]: `
    ул. ${activeDispatch.street},
    д. ${activeDispatch.building},
    кв. ${activeDispatch.apartment}`};

    data = Object.entries(Object.assign(data, formattedDispatch))
      .map((item: [string, string]) => {
        if ((item[0] === FormControlName.DispatchData) || (item[0] === FormControlName.AddressPoints)) {
          return null;
        } else {
          return {name: this.FormFieldMeta[item[0]].label, value: item[1]};
        }
      })
      .filter((item) => item);

    return data;
  }

  get pickupPoint() {
    let data =  this.data.steps[2][FormControlName.PickupPoint];

    if (!data) {
      return;
    }

    const receiveData = data[FormControlName.ReceiveData];
    const activeReceive = receiveData[receiveData.active];

    const formatted = {[receiveData.active]: `
    ул. ${activeReceive.street},
    д. ${activeReceive.building},
    кв. ${activeReceive.apartment}`};

    data = Object.entries(Object.assign(data, formatted))
      .map((item: [string, string]) => {
        if ((item[0] === FormControlName.ReceiveData) || (item[0] === FormControlName.AddressPoints)) {
          return null;
        } else {
          return {name: this.FormFieldMeta[item[0]].label, value: item[1]};
        }
      })
      .filter((item) => item);

    return data;
  }

  get cargoList() {
    const cargoItems =  this.data.steps[2]['cargo-group'];
    return cargoItems;
  }

  formatData(data) {
    if (!data) {
      return;
    }

    return Object.entries(data).map((item: [string, string]) => {
      return {name: this.FormFieldMeta[item[0]].label, value: item[1] || 'нет'};
    });
  }

  getCurrentCargo(items: any) {
    const cargo = Object.entries(items).filter((item: [string, string]) => {
      return (item.length && item[1]) && item;
    });

    if (cargo.length) {
      return {
        type: cargo[0][0],
        items: cargo[0][1]
      };
    } else {
      return {};
    }
  }

  setCargoType(type: any) {
    console.log('type', type);
    return [{name: 'Характер груза', value: type}];
  }

  formatParcel(item: any) {
    return [
    {name: 'Габариты',
      value: `
        Ширина: <b>${item.width} см</b>.,
        Высота: <b>${item.height} см</b>.,
        Длина: <b>${item.length} см</b>.`},
    {name: 'Вес', value: `${item.weight} кг.`}];
    // {name: 'Упаковка', value: 'Коробка картонная (4 шт), Сейф пакет (1 шт)'}
  }

  formatDocs(item: any) {
    return [{name: 'Количество', value: `${item} шт.`}];
  }

  formatAutoparts(item: any) {
    return [{name: 'Запчасть', value: item}];
  }

  formatPackaging(items: any) {
    const data = Object.entries(items)
          .map((item: [string, string]) => {
            return item[1] && this.FormFieldMeta[item[0]].label;
          })
          .filter((item: string) => item);

    return [{name: 'Упаковка', value: data.join(`, `)}];
  }
}
