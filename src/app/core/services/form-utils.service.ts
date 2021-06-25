import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {KeyValue} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  getGroupControls(group) {
    return (group as FormGroup).controls;
  }

  originalOrder = (a: KeyValue<string, AbstractControl>, b: KeyValue<string, AbstractControl>): number => {
    return 0;
  }
}
