import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalcRatePageComponent} from './calc-rate-page.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    CalcRatePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CalcRatePageModule { }
