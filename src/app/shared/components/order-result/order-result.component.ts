import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.scss']
})
export class OrderResultComponent implements OnInit {
  @Input() mods;

  public cssClass;

  constructor(private modsService: ModsService) {
    this.cssClass = this.modsService.setMods('order-result', this.mods);
  }

  ngOnInit(): void {
  }

}
