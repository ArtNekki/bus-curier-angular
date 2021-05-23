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
import {SendParcelPageModule} from './pages/send-parcel-page/send-parcel-page.module';
import {DocumentsPageModule} from './pages/documents-page/documents-page.module';
import {WorkInTeamPageModule} from './pages/work-in-team-page/work-in-team-page.module';
import {IndexPageModule} from './pages/index-page/index-page.module';
import {FeedbackPageModule} from './pages/feedback-page/feedback-page.module';
import {AboutPageModule} from './pages/about-page/about-page.module';
import {OurServicesPageModule} from './pages/our-services-page/our-services-page.module';
import {UsefulInfoPageModule} from './pages/useful-info-page/useful-info-page.module';
import {FeedbackLinksPageModule} from './pages/feedback-links-page/feedback-links-page.module';
import {ContactsPageModule} from './pages/contacts-page/contacts-page.module';
import {TrackOrderPageModule} from './pages/track-order-page/track-order-page.module';
import {AccountPageModule} from './pages/account-page/account-page.module';
import {OrderPageModule} from './pages/order-page/order-page.module';
import {CalcRatePageModule} from './pages/calc-rate-page/calc-rate-page.module';

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
    SendParcelPageModule,
    DocumentsPageModule,
    WorkInTeamPageModule,
    FeedbackPageModule,
    AboutPageModule,
    OurServicesPageModule,
    UsefulInfoPageModule,
    FeedbackLinksPageModule,
    ContactsPageModule,
    TrackOrderPageModule,
    AccountPageModule,
    OrderPageModule,
    CalcRatePageModule,
    // IndexPageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
