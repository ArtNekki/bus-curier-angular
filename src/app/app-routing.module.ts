import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {ParcelsPageComponent} from './pages/parcels-page/parcels-page.component';
import {DeliveryRussiaPageComponent} from './pages/delivery-russia-page/delivery-russia-page.component';


const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'parcels', component: ParcelsPageComponent},
  {path: 'delivery-russia', component: DeliveryRussiaPageComponent}
  // {
  //   path: 'parcels',
  //   loadChildren: () => import('./pages/parcels-page/parcels-page.module')
  //     .then(m => m.ParcelsPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
