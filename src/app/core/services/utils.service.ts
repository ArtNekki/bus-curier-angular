import { Injectable } from '@angular/core';

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
}
