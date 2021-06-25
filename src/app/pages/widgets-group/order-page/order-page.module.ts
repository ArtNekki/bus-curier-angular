import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {OrderPageComponent} from './order-page.component';
import { ParcelGroupComponent } from './components/form/parcel-group/parcel-group.component';



@NgModule({
  declarations: [
    OrderPageComponent,
    ParcelGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrderPageModule { }
