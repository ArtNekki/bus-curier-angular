import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidgetsGroupRoutingModule} from './widgets-group-routing.module';
import {WidgetsGroupComponent} from './widgets-group.component';
import {CalcRatePageModule} from './calc-rate-page/calc-rate-page.module';
import {OrderPageModule} from './order-page/order-page.module';
import {TrackOrderPageModule} from './track-order-page/track-order-page.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    WidgetsGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalcRatePageModule,
    OrderPageModule,
    TrackOrderPageModule,
    WidgetsGroupRoutingModule
  ]
})
export class WidgetsGroupModule { }
