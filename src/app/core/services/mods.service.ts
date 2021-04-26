import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModsService {

  constructor() { }

  setMods(cls, mods) {
    let cssClass = cls;
    let allMods = '';

    if (mods !== 'undefined' && mods ) {
      const modsList = mods.split(',');
      for (const item of modsList) {
        allMods = allMods + ` ${cls}--` + item.trim();
      }
    }

    cssClass += allMods;

    return cssClass;
  }
}
