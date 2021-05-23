import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesGroupComponent } from './services-group.component';
import {ServicesGroupRoutingModule} from './services-group-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {DeliveryRussiaPageModule} from './delivery-russia-page/delivery-russia-page.module';
import {ServicesPageModule} from './services-page/services-page.module';
import {CargoInsurancePageModule} from './cargo-insurance-page/cargo-insurance-page.module';
import {CourierPageModule} from './courier-page/courier-page.module';
import {NonStandardTasksPageModule} from './non-standard-tasks-page/non-standard-tasks-page.module';

@NgModule({
  declarations: [
    ServicesGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ServicesPageModule,
    CargoInsurancePageModule,
    CourierPageModule,
    NonStandardTasksPageModule,
    DeliveryRussiaPageModule,
    ServicesGroupRoutingModule,
  ]
})
export class ServicesGroupModule { }
