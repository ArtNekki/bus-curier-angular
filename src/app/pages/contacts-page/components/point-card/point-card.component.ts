import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';

@Component({
  selector: 'app-point-card',
  templateUrl: './point-card.component.html',
  styleUrls: ['./point-card.component.scss']
})
export class PointCardComponent implements OnInit {
  @Input() data: any;
  @Output() showOnMap: EventEmitter<any> = new EventEmitter<any>();
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {

  }

}
