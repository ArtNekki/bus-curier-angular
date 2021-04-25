import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SendParcelPageComponent} from './send-parcel-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    SendParcelPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class SendParcelPageModule { }
