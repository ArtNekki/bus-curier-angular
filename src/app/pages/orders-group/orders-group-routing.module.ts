import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdersGroupComponent} from './orders-group.component';
import {TrackOrderPageComponent} from './track-order-page/track-order-page.component';

const routes: Routes = [
  {path: '', component: OrdersGroupComponent, data: { title: 'Заявки' }, children: [
      { path: '', redirectTo: '/orders/track-order', pathMatch: 'full'},
      {path: 'track-order', component: TrackOrderPageComponent, data: { title: 'Отследить заказ' }},
      {path: 'quick-order', loadChildren: () => import('./quick-order-page/quick-order-page.module').then((m) => m.QuickOrderPageModule)},
      {path: 'order', loadChildren: () => import('./order-page/order-page.module').then((m) => m.OrderPageModule)},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersGroupRoutingModule { }
