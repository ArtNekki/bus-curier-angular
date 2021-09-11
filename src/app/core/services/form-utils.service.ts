import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {KeyValue} from '@angular/common';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor(private localStorage: LocalStorageService) { }

  getGroupControls(group) {
    return (group as FormGroup).controls;
  }

  originalOrder = (a: KeyValue<string, AbstractControl>, b: KeyValue<string, AbstractControl>): number => {
    return 0;
  }

  getAllCities() {
    return this.getDefaultFromStorage('cities');
  }

  getAllTypes() {
    return this.getDefaultFromStorage('types');
  }

  getAllServices() {
    return this.getDefaultFromStorage('services');
  }

  getDefaultFromStorage(type) {
    const storage = this.localStorage.get(type);
    const obj = {};

    if (storage) {

      storage.forEach((el: any) => {
        obj[el.id] = el;
      });

    }

    return obj;
  }
}
