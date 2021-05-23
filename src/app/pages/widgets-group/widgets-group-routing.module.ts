import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WidgetsGroupComponent} from './widgets-group.component';
import {TrackOrderPageComponent} from './track-order-page/track-order-page.component';
import {CalcRatePageComponent} from './calc-rate-page/calc-rate-page.component';
import {OrderPageComponent} from './order-page/order-page.component';

const routes: Routes = [
  {path: '', component: WidgetsGroupComponent, data: { title: 'Сервисы' }, children: [
      { path: '', redirectTo: '/widgets/track-order', pathMatch: 'full'},
      { path: 'track-order', component: TrackOrderPageComponent, data: { title: 'Отследить посылку' }},
      { path: 'calc-rate', component:  CalcRatePageComponent, data: { title: 'Расчет тарифа по Приморью' }},
      { path: 'order', component:  OrderPageComponent, data: { title: 'Онлайн-заявка' }},
      { path: 'search-order', component: null, data: { title: 'Поиск заказа' }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsGroupRoutingModule { }
