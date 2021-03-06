import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoGroupComponent } from './info-group.component';
import {InfoGroupRoutingModule} from './info-group-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {DeliveryFromAirportPageModule} from './delivery-from-airport-page/delivery-from-airport-page.module';
import {HowToSendPageModule} from './how-to-send-page/how-to-send-page.module';
import {PackingPageModule} from './packing-page/packing-page.module';
import {RulesOfSendPageModule} from './rules-of-send-page/rules-of-send-page.module';
import {TransportationRatesPageModule} from './transportation-rates-page/transportation-rates-page.module';
import { HowToGetPageComponent } from './how-to-get-page/how-to-get-page.component';
import { StorageOfCargoPageComponent } from './storage-of-cargo-page/storage-of-cargo-page.component';
import { PrivacyPolicyPageComponent } from './privacy-policy-page/privacy-policy-page.component';

@NgModule({
  declarations: [
    InfoGroupComponent,
    HowToGetPageComponent,
    StorageOfCargoPageComponent,
    PrivacyPolicyPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DeliveryFromAirportPageModule,
    HowToSendPageModule,
    PackingPageModule,
    RulesOfSendPageModule,
    TransportationRatesPageModule,
    InfoGroupRoutingModule
  ]
})
export class InfoGroupModule { }
