import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() head: [];
  @Input() body: [];
  @Input() mods;
  @Input() headerMods;

  public tableClass = '';
  public headerClass = '';

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.tableClass = this.modsService.setMods('table', this.mods);
    this.headerClass = this.modsService.setMods('table__header', this.headerMods);
  }
}
