import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {ParcelsPageComponent} from './pages/parcels-page/parcels-page.component';
import {DeliveryRussiaPageComponent} from './pages/delivery-russia-page/delivery-russia-page.component';
import {SendParcelPageComponent} from './pages/send-parcel-page/send-parcel-page.component';
import {PackingPageComponent} from './pages/packing-page/packing-page.component';
import {RulesOfSendPageComponent} from './pages/rules-of-send-page/rules-of-send-page.component';
import {DocumentsPageComponent} from './pages/documents-page/documents-page.component';
import {NonStandardTasksPageComponent} from './pages/non-standard-tasks-page/non-standard-tasks-page.component';
import {WorkInTeamPageComponent} from './pages/work-in-team-page/work-in-team-page.component';
import {FeedbackPageComponent} from './pages/feedback-page/feedback-page.component';


const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'parcels', component: ParcelsPageComponent},
  {path: 'delivery-russia', component: DeliveryRussiaPageComponent},
  {path: 'send-parcel', component: SendParcelPageComponent},
  {path: 'packing', component: PackingPageComponent},
  {path: 'rules-of-send', component: RulesOfSendPageComponent},
  {path: 'documents', component: DocumentsPageComponent},
  {path: 'non-standard-tasks', component: NonStandardTasksPageComponent},
  {path: 'work-in-team', component: WorkInTeamPageComponent},
  {path: 'feedback', component: FeedbackPageComponent}
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
