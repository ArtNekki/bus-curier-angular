import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../../core/services/mods.service';

interface Icon {
  name: string;
  width: string;
  height: string;
}

@Component({
  selector: 'app-account-media',
  templateUrl: './account-media.component.html',
  styleUrls: ['./account-media.component.scss']
})
export class AccountMediaComponent implements OnInit {
  @Input() title: string;
  @Input() href: string;
  @Input() mods;

  public cssClass;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('account-media', this.mods);
  }

}
