import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {OrderPageComponent} from './order-page.component';
import {ModalsModule} from '../../../../modals/modals.module';
import {OrderFormModule} from '../../common/order-form/order-form.module';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { DonePageComponent } from './pages/done-page/done-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import {OrderRoutingModule} from './order-routing.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { FailPageComponent } from './pages/fail-page/fail-page.component';

@NgModule({
  declarations: [
    OrderPageComponent,
    SidebarComponent,
    DonePageComponent,
    IndexPageComponent,
    FailPageComponent
  ],
  imports: [
    // BrowserAnimationsModule,
    CommonModule,
    // NoopAnimationsModule,
    ModalsModule,
    SharedModule,
    OrderFormModule,
    OrderRoutingModule
  ]
})
export class OrderPageModule { }
