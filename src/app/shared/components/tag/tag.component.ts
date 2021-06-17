import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  @Input() type: string;
  @Input() id: any;
  @Input() checked: boolean;
  @Input() mods;

  public cssClass;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('tag', this.mods);
  }

  onDelete(id) {
    this.delete.emit(id);
    console.log('tag', id);
  }

}
