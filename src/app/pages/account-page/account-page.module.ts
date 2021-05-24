import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountPageComponent} from './account-page.component';
import { AccountIndexPageComponent } from './pages/account-index-page/account-index-page.component';
import { AccountPersonalDataPageComponent } from './pages/account-personal-data-page/account-personal-data-page.component';
import { AccountOrdersPageComponent } from './pages/account-orders-page/account-orders-page.component';
import { AccountReportPageComponent } from './pages/account-report-page/account-report-page.component';
import { AccountMediaComponent } from './components/account-media/account-media.component';
import {AccountRoutingModule} from './account-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    AccountPageComponent,
    AccountIndexPageComponent,
    AccountPersonalDataPageComponent,
    AccountOrdersPageComponent,
    AccountReportPageComponent,
    AccountMediaComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountPageModule { }
