import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() mods;
  @Input() markers: Array<any>;
  @Input() latitude: string;
  @Input() longitude: string;
  @Input() zoom: string;
  @Input() disableDefaultUI: boolean;
  @Input() gestureHandling: boolean;
  @Input() scrollwheel: boolean;
  @Input() styles: any;

  title = 'AGM project';

  public cssClass;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('map', this.mods);
  }

}
