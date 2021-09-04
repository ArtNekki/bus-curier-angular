import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuickOrderPageComponent} from './quick-order-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {OrderFormModule} from '../common/order-form/order-form.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    QuickOrderPageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderFormModule
  ]
})
export class QuickOrderPageModule { }
