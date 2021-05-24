import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountIndexPageComponent} from './pages/account-index-page/account-index-page.component';
import {AccountPageComponent} from './account-page.component';
import {AccountPersonalDataPageComponent} from './pages/account-personal-data-page/account-personal-data-page.component';
import {AccountOrdersPageComponent} from './pages/account-orders-page/account-orders-page.component';
import {AccountReportPageComponent} from './pages/account-report-page/account-report-page.component';

const routes: Routes = [
  {path: '', component: AccountPageComponent, data: { title: 'Личный кабинет' }, children: [
      {path: '', redirectTo: '/account/index', pathMatch: 'full'},
      {path: 'index', component: AccountIndexPageComponent},
      {path: 'personal', component: AccountPersonalDataPageComponent, data: { title: 'Персональные данные' }},
      {path: 'orders', component: AccountOrdersPageComponent, data: { title: 'Мои заказы' }},
      {path: 'report', component: AccountReportPageComponent, data: { title: 'Сформировать отчет' }}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
