import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss']
})

export class BtnComponent implements OnInit {
  @Input() id;
  @Input() type;
  @Input() mods;
  @Input() disabled: boolean;
  @Input() hidden: boolean;

  public cssClass = 'btn';

  constructor() { }

  ngOnInit(): void {
    this.setMods();
  }

  setMods() {
    let allMods = '';

    if (this.mods !== 'undefined' && this.mods ) {
      const modsList = this.mods.split(',');
      for (const item of modsList) {
        allMods = allMods + ' btn--' + item.trim();
      }
    }

    this.cssClass += allMods;
  }
}
