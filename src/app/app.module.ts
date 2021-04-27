import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PageHeaderModule} from './modules/page-header/page-header.module';
import {PageFooterModule} from './modules/page-footer/page-footer.module';
import { AccountComponent } from './modules/account/account.component';
import { OrderComponent } from './modules/order/order.component';
import { CalculatorComponent } from './modules/calculator/calculator.component';
import {ParcelsPageModule} from './pages/parcels-page/parcels-page.module';
import {DeliveryRussiaPageModule} from './pages/delivery-russia-page/delivery-russia-page.module';
import {SendParcelPageModule} from './pages/send-parcel-page/send-parcel-page.module';
import {PackingPageModule} from './pages/packing-page/packing-page.module';
import {RulesOfSendModule} from './pages/rules-of-send/rules-of-send.module';
import {DocumentsPageModule} from './pages/documents-page/documents-page.module';
import {NonStandardTasksModule} from './pages/non-standard-tasks/non-standard-tasks.module';
import {WorkInTeamModule} from './pages/work-in-team/work-in-team.module';
import {IndexPageModule} from './pages/index-page/index-page.module';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    OrderComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    PageHeaderModule,
    PageFooterModule,
    IndexPageModule,
    ParcelsPageModule,
    PackingPageModule,
    DeliveryRussiaPageModule,
    SendParcelPageModule,
    RulesOfSendModule,
    DocumentsPageModule,
    NonStandardTasksModule,
    WorkInTeamModule,
    // IndexPageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
