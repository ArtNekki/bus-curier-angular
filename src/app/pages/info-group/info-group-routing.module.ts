import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InfoGroupComponent} from './info-group.component';
import {HowToSendPageComponent} from './how-to-send-page/how-to-send-page.component';
import {DeliveryFromAirportPageComponent} from './delivery-from-airport-page/delivery-from-airport-page.component';
import {PackingPageComponent} from './packing-page/packing-page.component';
import {RulesOfSendPageComponent} from './rules-of-send-page/rules-of-send-page.component';
import {TransportationRatesPageComponent} from './transportation-rates-page/transportation-rates-page.component';
import {HowToGetPageComponent} from './how-to-get-page/how-to-get-page.component';
import {StorageOfCargoPageComponent} from './storage-of-cargo-page/storage-of-cargo-page.component';
import {PrivacyPolicyPageComponent} from './privacy-policy-page/privacy-policy-page.component';

const routes: Routes = [
  {path: '', component: InfoGroupComponent, data: { title: 'Информация' }, children: [
    { path: '', redirectTo: '/info/how-to-send', pathMatch: 'full'},
    { path: 'how-to-send', component:  HowToSendPageComponent, data: { title: 'Как отправить посылку' }},
    { path: 'how-to-get', component:  HowToGetPageComponent, data: { title: 'Как получить посылку' }},
    { path: 'delivery-from-airport', component:  DeliveryFromAirportPageComponent, data: { title: 'Доставка грузов и багажа из Аэропорта' }},
    { path: 'packing', component:  PackingPageComponent, data: { title: 'Упаковки грузов и виды упаковки' }},
    { path: 'storage-cargo', component: StorageOfCargoPageComponent, data: { title: 'Хранение груза на складах Bus-курьер' }},
    { path: 'rules-of-send', component:  RulesOfSendPageComponent, data: { title: 'Правила приемки и отправки грузов' }},
    { path: 'transportation-rates', component:  TransportationRatesPageComponent, data: { title: 'Тарифы на перевозку' }},
    { path: 'privacy-policy', component:  PrivacyPolicyPageComponent, data: { title: 'Политика конфиденциальности' }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InfoGroupRoutingModule { }
