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

  public FormFieldMeta = formFieldMeta;

  constructor(public formUtils: FormUtilsService) { }

  ngOnInit(): void {

  }

  get author() {
    for (const [key, value] of Object.entries(this.data.steps[0].author)) {
      if (value) {
        return this.formatData(value);
      }
    }
  }

  get sender() {
    return this.formatData(this.data.steps[1].sender);
  }

  get recipient() {
    return this.formatData(this.data.steps[2].recipient);
  }

  get departurePoint() {
    let data =  this.data.steps[1][FormControlName.DeparturePoint];
    const dispatchData = data[FormControlName.DispatchData];

    let type = {};

    for (const [key, value] of Object.entries(dispatchData)) {
      if (value) {
        type = {[key]: `
        ул. ${(value as Address).street},
        д. ${(value as Address).building},
        кв. ${(value as Address).apartment}`};
      }
    }

    data = Object.assign(data, type);

    data = Object.entries(data)
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
    const dispatchData = data[FormControlName.ReceiveData];

    let type = {};

    for (const [key, value] of Object.entries(dispatchData)) {
      if (value) {
        type = {[key]: `
        ул. ${(value as Address).street},
        д. ${(value as Address).building},
        кв. ${(value as Address).apartment}`};
      }
    }

    data = Object.assign(data, type);

    data = Object.entries(data)
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

  formatData(data) {
    return Object.entries(data).map((item: [string, string]) => {
      return {name: this.FormFieldMeta[item[0]].label, value: item[1]};
    });
  }
}
