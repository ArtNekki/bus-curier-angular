import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  public isTouched$ = new Subject();

  constructor() { }

  setAsTouched() {
    this.isTouched$.next(true);
  }

  setAsUntouched() {
    this.isTouched$.next(false);
  }
}
