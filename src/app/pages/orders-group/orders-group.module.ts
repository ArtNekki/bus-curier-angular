import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersGroupRoutingModule} from './orders-group-routing.module';
import {OrdersGroupComponent} from './orders-group.component';
import {CalcRatePageModule} from './calc-rate-page/calc-rate-page.module';
import {TrackOrderPageModule} from './track-order-page/track-order-page.module';
import {SharedModule} from '../../shared/shared.module';
import { OrderDonePageComponent } from './order-done-page/order-done-page.component';

@NgModule({
  declarations: [
    OrdersGroupComponent,
    OrderDonePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalcRatePageModule,
    TrackOrderPageModule,
    OrdersGroupRoutingModule
  ]
})
export class OrdersGroupModule { }
