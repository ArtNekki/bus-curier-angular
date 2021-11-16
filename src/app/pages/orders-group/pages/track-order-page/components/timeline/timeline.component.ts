import {Component, Input, OnInit} from '@angular/core';
import {OrderTracking} from '../../../../../../core/interfaces/order';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() data: Array<OrderTracking>;
  @Input() number: string;

  public Status = {
    ORDER_POSTING: 'yellow',
    ORDER_INTRANSIT: 'yellow',
    ORDER_SORTING: 'yellow',
    ORDER_READY: 'blue',
    ORDER_DELIVERED: 'blue',
    ORDER_SELFEXTRACT: 'yellow',
    ORDER_RETURN: 'yellow',
    ORDER_FAILURE: 'red',
    ORDER_STORAGE: 'blue',
    ORDER_RESENT: 'yellow',
    ORDER_CANCELED: 'red'
  };

  constructor() { }

  ngOnInit(): void { }

  formatDate(date) {
    const datetime = date.split(' ');
    const formattedDate = new Intl.DateTimeFormat('ru-Ru', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(datetime[0]));

    return formattedDate;
  }
}
