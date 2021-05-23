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
import {HowToSendPageComponent} from './pages/how-to-send-page/how-to-send-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {DeliveryFromAirportPageComponent} from './pages/delivery-from-airport-page/delivery-from-airport-page.component';
import {CargoInsurancePageComponent} from './pages/cargo-insurance-page/cargo-insurance-page.component';
import {CourierPageComponent} from './pages/courier-page/courier-page.component';
import {OurServicesPageComponent} from './pages/our-services-page/our-services-page.component';
import {UsefulInfoPageComponent} from './pages/useful-info-page/useful-info-page.component';
import {ServicesPageComponent} from './pages/services-page/services-page.component';
import {FeedbackLinksPageComponent} from './pages/feedback-links-page/feedback-links-page.component';
import {ContactsPageComponent} from './pages/contacts-page/contacts-page.component';
import {TransportationRatesPageComponent} from './pages/transportation-rates-page/transportation-rates-page.component';
import {TrackOrderPageComponent} from './pages/track-order-page/track-order-page.component';
import {AccountPageComponent} from './pages/account-page/account-page.component';
import {OrderPageComponent} from './pages/order-page/order-page.component';
import {CalcRatePageComponent} from './pages/calc-rate-page/calc-rate-page.component';


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
  {path: 'feedback', component: FeedbackPageComponent},
  {path: 'how-to-send', component: HowToSendPageComponent},
  // {path: 'how-to-get', component: HowToGetPageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'delivery-from-airport', component: DeliveryFromAirportPageComponent},
  {path: 'cargo-insurance', component: CargoInsurancePageComponent},
  // {path: 'cargo-storage', component: CargoStoragePageComponent},
  {path: 'courier', component: CourierPageComponent},
  {path: 'our-services', component: OurServicesPageComponent},
  {path: 'useful-info', component: UsefulInfoPageComponent},
  {path: 'services', component: ServicesPageComponent},
  {path: 'feedback-links', component: FeedbackLinksPageComponent},
  {path: 'contacts', component: ContactsPageComponent},
  {path: 'transportation-rates', component: TransportationRatesPageComponent},
  {path: 'track-order', component: TrackOrderPageComponent},
  {path: 'order', component: OrderPageComponent},
  {path: 'calc-rate', component: CalcRatePageComponent}
  // { path: 'account', loadChildren: () => import('./pages/account-page/account-page.module').then((m) => m.AccountPageModule) }

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
