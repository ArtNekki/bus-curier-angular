import {Component, Input, OnInit} from '@angular/core';
import {FormUtilsService} from '../../../../../../core/services/form-utils.service';
import FormControlName from '../../../../../../core/maps/FormControlName';
import UserType from '../../../../../../core/maps/UserType';
import firebase from 'firebase';
import User = firebase.User;
import formFieldMeta from '../../../../../../core/form/formFieldMeta';

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
    console.log('author', this.author);
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

  formatData(data) {
    return Object.entries(data).map((item: [string, string]) => {
      console.log('item', item);
      return {name: this.FormFieldMeta[item[0]].label, value: item[1]};
    });
  }
}
