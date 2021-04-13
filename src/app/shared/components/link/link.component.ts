import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() id;
  @Input() href;
  @Input() mods;

  public cssClass = 'link';

  constructor() { }

  ngOnInit(): void {
    this.setMods();
  }

  setMods() {
    let allMods = '';

    if (this.mods !== 'undefined' && this.mods ) {
      const modsList = this.mods.split(',');
      for (const item of modsList) {
        allMods = allMods + ' link--' + item.trim();
      }
    }

    this.cssClass += allMods;
  }
}
