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
    ORDER_DELIVERED: 'blue'
  };

  constructor() { }

  ngOnInit(): void { }

  formatDate(date) {
    const datetime = date.split(' ');
    const formattedDate = new Intl.DateTimeFormat('ru-Ru').format(new Date(datetime[0]));
    const formattedTime = new Intl.DateTimeFormat('ru-Ru', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(new Date(date));

    return `${formattedDate} ${formattedTime}`;
  }
}
