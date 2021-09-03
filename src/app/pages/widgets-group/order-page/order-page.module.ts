import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {OrderPageComponent} from './order-page.component';
import {ModalsModule} from '../../../modals/modals.module';
import {OrderFormModule} from '../common/order-form/order-form.module';
import {SidebarResultComponent} from './components/sidebar-result/sidebar-result.component';

@NgModule({
  declarations: [
    OrderPageComponent,
    SidebarResultComponent
  ],
  imports: [
    CommonModule,
    ModalsModule,
    SharedModule,
    OrderFormModule
  ]
})
export class OrderPageModule { }
