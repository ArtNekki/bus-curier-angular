import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {AgmMarker} from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() mods;
  @Input() points: Array<any>;
  @Input() latitude: string;
  @Input() longitude: string;
  @Input() zoom: string;
  @Input() disableDefaultUI: boolean;
  @Input() gestureHandling: boolean;
  @Input() scrollwheel: boolean;
  @Input() styles: any;
  @Output() pointClick: EventEmitter<any> = new EventEmitter<any>();

  title = 'AGM project';

  public cssClass;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('map', this.mods);
  }

  mapClick($event: MouseEvent) {
    console.log('map click', $event);
  }

  pointChange($event: AgmMarker) {
    this.pointClick.emit($event.label);
  }
}
