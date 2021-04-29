import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {HowToSendPageComponent} from './how-to-send-page.component';



@NgModule({
  declarations: [
    HowToSendPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class HowToSendPageModule { }
