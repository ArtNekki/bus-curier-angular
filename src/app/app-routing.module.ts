import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {IndexPageComponent} from './pages/index-page/index-page.component';
import {ParcelsPageComponent} from './pages/parcels-page/parcels-page.component';
import {SendParcelPageComponent} from './pages/send-parcel-page/send-parcel-page.component';
import {DocumentsPageComponent} from './pages/documents-page/documents-page.component';
import {WorkInTeamPageComponent} from './pages/work-in-team-page/work-in-team-page.component';
import {FeedbackPageComponent} from './pages/feedback-page/feedback-page.component';
import {AboutPageComponent} from './pages/about-page/about-page.component';
import {UsefulInfoPageComponent} from './pages/useful-info-page/useful-info-page.component';
import {FeedbackLinksPageComponent} from './pages/feedback-links-page/feedback-links-page.component';
import {ContactsPageComponent} from './pages/contacts-page/contacts-page.component';
import {OurServicesPageComponent} from './pages/our-services-page/our-services-page.component';

const routes: Routes = [
  {path: '', component: IndexPageComponent, data: { title: 'Главная' }},
  {path: 'parcels', component: ParcelsPageComponent, data: { title: 'Посылки' }},
  {path: 'send-parcel', component: SendParcelPageComponent, data: { title: 'Отправка посылки' }},
  {path: 'documents', component: DocumentsPageComponent, data: { title: 'Документы' }},
  {path: 'work-in-team', component: WorkInTeamPageComponent, data: { title: 'Работа в команде' }},
  {path: 'feedback', component: FeedbackPageComponent, data: { title: 'Обратная связь' }},
  // {path: 'how-to-get', component: HowToGetPageComponent},
  {path: 'about', component: AboutPageComponent},
  // {path: 'cargo-storage', component: CargoStoragePageComponent},
  {path: 'our-services', component: OurServicesPageComponent, data: { title: 'Наши услуги' }},
  {path: 'useful-info', component: UsefulInfoPageComponent},
  {path: 'feedback-links', component: FeedbackLinksPageComponent},
  {path: 'contacts', component: ContactsPageComponent},
  {path: 'services', loadChildren: () => import('./pages/services-group/services-group.module').then((m) => m.ServicesGroupModule)},
  {path: 'info', loadChildren: () => import('./pages/info-group/info-group.module').then((m) => m.InfoGroupModule)},
  {path: 'widgets', loadChildren: () => import('./pages/widgets-group/widgets-group.module').then((m) => m.WidgetsGroupModule)},
  {path: 'account', loadChildren: () => import('./pages/account-page/account-page.module').then((m) => m.AccountPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
