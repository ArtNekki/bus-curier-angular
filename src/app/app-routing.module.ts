import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {ParcelsPageComponent} from './pages/parcels-page/parcels-page.component';


const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'parcels', component: ParcelsPageComponent}
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
