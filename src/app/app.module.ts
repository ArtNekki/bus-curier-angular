import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PageHeaderModule} from './modules/page-header/page-header.module';
import {PageFooterModule} from './modules/page-footer/page-footer.module';
import { AccountComponent } from './modules/account/account.component';
import { OrderComponent } from './modules/order/order.component';
import { CalculatorComponent } from './modules/calculator/calculator.component';
import {IndexPageModule} from './pages/index-page/index-page.module';
import { ParcelsPageComponent } from './pages/parcels-page/parcels-page.component';
import {ParcelsPageModule} from './pages/parcels-page/parcels-page.module';

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
    ParcelsPageModule,
    // IndexPageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
