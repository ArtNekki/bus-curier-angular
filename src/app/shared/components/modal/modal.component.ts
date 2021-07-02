import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';
import fadeIn from '../../../core/animations/fadeIn';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [fadeIn]
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() mods;

  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  public cssClass = 'modal';

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('modal', this.mods);
  }

  onClose() {
    this.close.emit();
  }
}
