import {Component, Input, OnInit} from '@angular/core';
import ContactBox from '../../../core/models/Contact-box';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit {
  @Input() data;
  @Input() mods;

  public cssClass;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('contact-box', this.mods);
  }

}
