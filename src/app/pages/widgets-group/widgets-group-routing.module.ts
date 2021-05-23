import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WidgetsGroupComponent} from './widgets-group.component';
import {TrackOrderPageComponent} from './track-order-page/track-order-page.component';
import {CalcRatePageComponent} from './calc-rate-page/calc-rate-page.component';
import {OrderPageComponent} from './order-page/order-page.component';

const routes: Routes = [
  {path: '', component: WidgetsGroupComponent, children: [
      { path: '', redirectTo: '/widgets/track-order', pathMatch: 'full'},
      { path: 'track-order', component: TrackOrderPageComponent},
      { path: 'calc-rate', component:  CalcRatePageComponent},
      { path: 'order', component:  OrderPageComponent},
      { path: 'search-order', component: null}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsGroupRoutingModule { }
