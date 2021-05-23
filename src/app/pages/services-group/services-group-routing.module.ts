import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicesGroupComponent} from './services-group.component';
import {CargoInsurancePageComponent} from './cargo-insurance-page/cargo-insurance-page.component';
import {CourierPageComponent} from './courier-page/courier-page.component';
import {DeliveryRussiaPageComponent} from './delivery-russia-page/delivery-russia-page.component';
import {ServicesPageComponent} from './services-page/services-page.component';
import {NonStandardTasksPageComponent} from './non-standard-tasks-page/non-standard-tasks-page.component';


const routes: Routes = [
  {path: '', component: ServicesGroupComponent, data: { title: 'Наши услуги' }, children: [
      { path: '', redirectTo: '/services/our-services', pathMatch: 'full'},
      { path: 'our-services', component:  ServicesPageComponent},
      { path: 'cargo-insurance', component:  CargoInsurancePageComponent, data: { title: 'Страхование груза' }},
      { path: 'courier', component:  CourierPageComponent, data: { title: 'Забор и доставка курьером' }},
      { path: 'delivery-russia', component:  DeliveryRussiaPageComponent, data: { title: 'Грузоперевозки по России' }},
      { path: 'non-standard-tasks', component:  NonStandardTasksPageComponent, data: { title: 'Реализация нестандартных логистических задач' }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesGroupRoutingModule { }
