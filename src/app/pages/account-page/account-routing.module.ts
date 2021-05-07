import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountIndexPageComponent} from './pages/account-index-page/account-index-page.component';
import {AccountPageComponent} from './account-page.component';
import {AccountPersonalDataPageComponent} from './pages/account-personal-data-page/account-personal-data-page.component';
import {AccountOrdersPageComponent} from './pages/account-orders-page/account-orders-page.component';
import {AccountReportPageComponent} from './pages/account-report-page/account-report-page.component';


const routes: Routes = [
  {path: 'account', component: AccountPageComponent, children: [
      // {path: '', redirectTo: 'account/index', pathMatch: 'full'}
      {path: 'index', component: AccountIndexPageComponent},
      {path: 'personal', component: AccountPersonalDataPageComponent},
      {path: 'orders', component: AccountOrdersPageComponent},
      {path: 'report', component: AccountReportPageComponent}
  ]},

  // {
  //   path: 'parcels',
  //   loadChildren: () => import('./pages/parcels-page/parcels-page.module')
  //     .then(m => m.ParcelsPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
