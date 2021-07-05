import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsefulInfoPageComponent} from './useful-info-page.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    UsefulInfoPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UsefulInfoPageModule { }
