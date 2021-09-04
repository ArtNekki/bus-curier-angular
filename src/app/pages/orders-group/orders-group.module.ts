import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersGroupRoutingModule} from './orders-group-routing.module';
import {OrdersGroupComponent} from './orders-group.component';
import {QuickOrderPageModule} from './pages/quick-order-page/quick-order-page.module';
import {TrackOrderPageModule} from './pages/track-order-page/track-order-page.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    OrdersGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuickOrderPageModule,
    TrackOrderPageModule,
    OrdersGroupRoutingModule
  ]
})
export class OrdersGroupModule { }
