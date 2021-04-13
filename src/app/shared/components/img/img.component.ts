import {Component, Input, OnInit} from '@angular/core';

interface Breakpoints {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})

export class ImgComponent implements OnInit {
  @Input() width: number;
  @Input() height: number;
  @Input() maxWidth: number;
  @Input() name: string;
  @Input() ext = 'jpg';
  @Input() alt: string;
  @Input() mods: string;
  @Input() breakpoints: Breakpoints;

  public cssClass = 'img';

  constructor() { }

  ngOnInit(): void {
    this.setMods();
  }

  setMods() {
    let allMods = '';

    if (this.mods !== 'undefined' && this.mods ) {
      const modsList = this.mods.split(',');
      for (const item of modsList) {
        allMods = allMods + ' img--' + item.trim();
      }
    }

    this.cssClass += allMods;
  }
}
