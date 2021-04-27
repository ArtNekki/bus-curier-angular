import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {ParcelsPageComponent} from './pages/parcels-page/parcels-page.component';
import {DeliveryRussiaPageComponent} from './pages/delivery-russia-page/delivery-russia-page.component';
import {SendParcelPageComponent} from './pages/send-parcel-page/send-parcel-page.component';
import {PackingPageComponent} from './pages/packing-page/packing-page.component';
import {RulesOfSendComponent} from './pages/rules-of-send/rules-of-send.component';
import {DocumentsPageComponent} from './pages/documents-page/documents-page.component';
import {NonStandardTasksModule} from './pages/non-standard-tasks/non-standard-tasks.module';
import {NonStandardTasksComponent} from './pages/non-standard-tasks/non-standard-tasks.component';
import {WorkInTeamComponent} from './pages/work-in-team/work-in-team.component';


const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'parcels', component: ParcelsPageComponent},
  {path: 'delivery-russia', component: DeliveryRussiaPageComponent},
  {path: 'send-parcel', component: SendParcelPageComponent},
  {path: 'packing', component: PackingPageComponent},
  {path: 'rules-of-send', component: RulesOfSendComponent},
  {path: 'documents', component: DocumentsPageComponent},
  {path: 'non-standard-tasks', component: NonStandardTasksComponent},
  {path: 'work-in-team', component: WorkInTeamComponent}
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
