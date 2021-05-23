import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InfoGroupComponent} from './info-group.component';
import {HowToSendPageComponent} from './how-to-send-page/how-to-send-page.component';
import {DeliveryFromAirportPageComponent} from './delivery-from-airport-page/delivery-from-airport-page.component';
import {PackingPageComponent} from './packing-page/packing-page.component';
import {RulesOfSendPageComponent} from './rules-of-send-page/rules-of-send-page.component';
import {TransportationRatesPageComponent} from './transportation-rates-page/transportation-rates-page.component';

const routes: Routes = [
  {path: '', component: InfoGroupComponent, children: [
      { path: '', redirectTo: '/info/how-to-send', pathMatch: 'full'},
      { path: 'how-to-send', component:  HowToSendPageComponent},
      { path: 'how-to-get', component:  null},
      { path: 'delivery-from-airport', component:  DeliveryFromAirportPageComponent},
      { path: 'packing', component:  PackingPageComponent},
      { path: 'storage-cargo', component: null},
      { path: 'rules-of-send', component:  RulesOfSendPageComponent},
      { path: 'transportation-rates', component:  TransportationRatesPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InfoGroupRoutingModule { }
