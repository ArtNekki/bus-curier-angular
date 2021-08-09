import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {OrderPageComponent} from './order-page.component';
import {ModalsModule} from '../../../modals/modals.module';
import {OrderFormModule} from '../common/order-form/order-form.module';

@NgModule({
  declarations: [
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    ModalsModule,
    SharedModule,
    OrderFormModule
  ]
})
export class OrderPageModule { }
