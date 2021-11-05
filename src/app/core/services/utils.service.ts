import { Injectable } from '@angular/core';
import {KeyValue} from '@angular/common';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor() { }

  isObject(obj) {
    const type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  copyObject(src) {
    const target = {};
    for (const prop in src) {
      if (src.hasOwnProperty(prop)) {
        // if the value is a nested object, recursively copy all it's properties
        if (this.isObject(src[prop])) {
          target[prop] = this.copyObject(src[prop]);
        } else {
          target[prop] = src[prop];
        }
      }
    }
    return target;
  }

  getObjectKey(object) {
    return (object instanceof Object) && Object.keys(object);
  }

  formatUrl(url) {
    return url.split('?')[0].split('/').filter(item => item);
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  originalOrder = (a: KeyValue<string, AbstractControl>, b: KeyValue<string, AbstractControl>): number => {
    return 0;
  }
}
