import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourierPageComponent} from './courier-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    CourierPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CourierPageModule { }
