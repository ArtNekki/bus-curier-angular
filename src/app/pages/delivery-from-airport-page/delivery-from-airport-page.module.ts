import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeliveryFromAirportPageComponent} from './delivery-from-airport-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    DeliveryFromAirportPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DeliveryFromAirportPageModule { }
