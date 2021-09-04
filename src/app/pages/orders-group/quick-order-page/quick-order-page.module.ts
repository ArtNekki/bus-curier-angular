import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuickOrderPageComponent} from './quick-order-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {OrderFormModule} from '../common/order-form/order-form.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FailPageComponent } from './pages/fail-page/fail-page.component';
import { DonePageComponent } from './pages/done-page/done-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import {QuickOrderRoutingModule} from './quick-order-routing.module';

@NgModule({
  declarations: [
    QuickOrderPageComponent,
    SidebarComponent,
    FailPageComponent,
    DonePageComponent,
    IndexPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderFormModule,
    QuickOrderRoutingModule
  ]
})
export class QuickOrderPageModule { }
