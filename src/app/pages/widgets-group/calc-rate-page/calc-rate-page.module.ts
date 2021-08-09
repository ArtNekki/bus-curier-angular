import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalcRatePageComponent} from './calc-rate-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {OrderFormModule} from '../common-modules/order-form/order-form.module';



@NgModule({
  declarations: [
    CalcRatePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderFormModule
  ]
})
export class CalcRatePageModule { }
