import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RulesOfSendPageComponent} from './rules-of-send-page.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    RulesOfSendPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RulesOfSendPageModule { }
