import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  @Input() mods;

  public cssClass = 'media';

  constructor() { }

  ngOnInit(): void {
    this.setMods();
  }

  setMods() {
    let allMods = '';

    if (this.mods !== 'undefined' && this.mods ) {
      const modsList = this.mods.split(',');
      for (const item of modsList) {
        allMods = allMods + ' media--' + item.trim();
      }
    }

    this.cssClass += allMods;
  }

}
