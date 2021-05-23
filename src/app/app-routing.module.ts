import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {ParcelsPageComponent} from './pages/parcels-page/parcels-page.component';
import {SendParcelPageComponent} from './pages/send-parcel-page/send-parcel-page.component';
import {PackingPageComponent} from './pages/info-group/packing-page/packing-page.component';
import {RulesOfSendPageComponent} from './pages/info-group/rules-of-send-page/rules-of-send-page.component';
import {DocumentsPageComponent} from './pages/documents-page/documents-page.component';
import {WorkInTeamPageComponent} from './pages/work-in-team-page/work-in-team-page.component';
import {FeedbackPageComponent} from './pages/feedback-page/feedback-page.component';
import {HowToSendPageComponent} from './pages/info-group/how-to-send-page/how-to-send-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {DeliveryFromAirportPageComponent} from './pages/info-group/delivery-from-airport-page/delivery-from-airport-page.component';
import {OurServicesPageComponent} from './pages/our-services-page/our-services-page.component';
import {UsefulInfoPageComponent} from './pages/useful-info-page/useful-info-page.component';
import {FeedbackLinksPageComponent} from './pages/feedback-links-page/feedback-links-page.component';
import {ContactsPageComponent} from './pages/contacts-page/contacts-page.component';
import {TransportationRatesPageComponent} from './pages/info-group/transportation-rates-page/transportation-rates-page.component';
import {TrackOrderPageComponent} from './pages/widgets-group/track-order-page/track-order-page.component';
import {AccountPageComponent} from './pages/account-page/account-page.component';
import {OrderPageComponent} from './pages/widgets-group/order-page/order-page.component';
import {CalcRatePageComponent} from './pages/widgets-group/calc-rate-page/calc-rate-page.component';


const routes: Routes = [
  {path: '', component: IndexPageComponent, data: { title: 'Главная' }},
  {path: 'parcels', component: ParcelsPageComponent, data: { title: 'Посылки' }},
  {path: 'send-parcel', component: SendParcelPageComponent, data: { title: 'Отправка посылки' }},
  {path: 'documents', component: DocumentsPageComponent, data: { title: 'Документы' }},
  {path: 'work-in-team', component: WorkInTeamPageComponent, data: { title: 'Работа в команде' }},
  {path: 'feedback', component: FeedbackPageComponent},
  // {path: 'how-to-get', component: HowToGetPageComponent},
  {path: 'about', component: AboutPageComponent},
  // {path: 'cargo-storage', component: CargoStoragePageComponent},
  // {path: 'our-services', component: OurServicesPageComponent},
  {path: 'useful-info', component: UsefulInfoPageComponent},
  {path: 'feedback-links', component: FeedbackLinksPageComponent},
  {path: 'contacts', component: ContactsPageComponent},
  {path: 'services', loadChildren: () => import('./pages/services-group/services-group.module').then((m) => m.ServicesGroupModule) },
  {path: 'info', loadChildren: () => import('./pages/info-group/info-group.module').then((m) => m.InfoGroupModule) },
  {path: 'widgets', loadChildren: () => import('./pages/widgets-group/widgets-group.module').then((m) => m.WidgetsGroupModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
