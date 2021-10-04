import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-contacts-map',
  templateUrl: './contacts-map.component.html',
  styleUrls: ['./contacts-map.component.scss']
})
export class ContactsMapComponent implements OnInit, OnChanges {
  @Input() currentPointId: string;
  @Input() points = [];

  @Output() pointClick: EventEmitter<any> = new EventEmitter<any>();

  public currentPoint = null;
  public mapZoom = 6;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.points && changes.points.currentValue) {
      this.points = changes.points.currentValue;
    }

    if (changes.currentPointId && changes.currentPointId.currentValue) {
      this.currentPointId =  changes.currentPointId && changes.currentPointId.currentValue;
    }

    if (this.points && this.currentPointId) {
      this.currentPoint = this.points.filter((point) => point.id === this.currentPointId);
      this.currentPoint = this.currentPoint.length ? this.currentPoint[0] : null;
      this.mapZoom = 15;
    }
  }

}
