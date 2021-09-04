import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalcRatePageComponent} from './calc-rate-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {OrderFormModule} from '../common/order-form/order-form.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    CalcRatePageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderFormModule
  ]
})
export class CalcRatePageModule { }
