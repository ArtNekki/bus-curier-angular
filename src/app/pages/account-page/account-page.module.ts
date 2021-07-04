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
import {ModalsModule} from '../../modals/modals.module';
import { AccountInnerPageComponent } from './pages/account-inner-page/account-inner-page.component';
import { ProxyManGroupComponent } from './components/form/proxy-man-group/proxy-man-group.component';
import { ProxyManComponent } from './components/form/proxy-man/proxy-man.component';
import { EntityEditComponent } from './components/form/entity-edit/entity-edit.component';
import { EntityAuthEditComponent } from './components/form/entity-auth-edit/entity-auth-edit.component';
import { IndividualEditComponent } from './components/form/individual-edit/individual-edit.component';
import { BalanceBlockComponent } from './components/balance-block/balance-block.component';

@NgModule({
  declarations: [
    AccountPageComponent,
    AccountIndexPageComponent,
    AccountPersonalDataPageComponent,
    AccountOrdersPageComponent,
    AccountReportPageComponent,
    AccountMediaComponent,
    AccountComponent,
    AccountInnerPageComponent,
    ProxyManGroupComponent,
    ProxyManComponent,
    EntityEditComponent,
    EntityAuthEditComponent,
    IndividualEditComponent,
    BalanceBlockComponent
  ],
  imports: [
    CommonModule,
    ModalsModule,
    SharedModule,
    AccountRoutingModule
  ]
})
export class AccountPageModule { }
