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

  constructor() { }

  ngOnInit(): void { }

  formatDate(date) {
    const datetime = date.split(' ');
    return `${new Intl.DateTimeFormat('ru-Ru').format(new Date(datetime[0]))} ${datetime[1]}`;
  }

}
