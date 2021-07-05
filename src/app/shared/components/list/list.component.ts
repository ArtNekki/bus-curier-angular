import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import {UtilsService} from '../../../core/services/utils.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() data;
  @Input() mods;

  public cssClass;

  constructor(
    private utils: UtilsService,
    private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('list', this.mods);
  }

  isLink(item) {
    return this.utils.isObject(item) && item.href;
  }
}
