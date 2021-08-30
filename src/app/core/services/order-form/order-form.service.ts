import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {
  public $form = new Subject();
  public cityFrom$ = new Subject();
  public cityTo$ = new Subject();
  public isTouched$ = new Subject();
  public formData$ = new Subject();
  public invalidStep$ = new Subject();

  private ordersList$ = new Subject();

  constructor() { }

  set orders(data: any) {
    this.ordersList$.next(data);
  }

  get orders() {
    return this.ordersList$;
  }
  //
  // setInvalidStep(num: any) {
  //   this.invalidStep$.next(num);
  // }
  //
  // submit(data: {submitted: boolean, step: number}) {
  //   this.formData$.next(data);
  // }
}
