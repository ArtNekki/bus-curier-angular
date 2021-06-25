import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor() { }

  getObjectKey(object) {
    return (object instanceof Object) && Object.keys(object);
  }
}
