import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicesGroupComponent} from './services-group.component';
import {CargoInsurancePageComponent} from './cargo-insurance-page/cargo-insurance-page.component';
import {CourierPageComponent} from './courier-page/courier-page.component';
import {DeliveryRussiaPageComponent} from './delivery-russia-page/delivery-russia-page.component';
import {ServicesPageComponent} from './services-page/services-page.component';
import {NonStandardTasksPageComponent} from './non-standard-tasks-page/non-standard-tasks-page.component';


const routes: Routes = [
  {path: '', component: ServicesGroupComponent, children: [
      { path: '', redirectTo: '/services/our-services', pathMatch: 'full'},
      { path: 'our-services', component:  ServicesPageComponent},
      { path: 'cargo-insurance', component:  CargoInsurancePageComponent},
      { path: 'courier', component:  CourierPageComponent},
      { path: 'delivery-russia', component:  DeliveryRussiaPageComponent},
      { path: 'non-standard-tasks', component:  NonStandardTasksPageComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesGroupRoutingModule { }
