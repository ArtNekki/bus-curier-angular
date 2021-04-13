import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';



@NgModule({
  imports: [
    // CommonModule,
    HttpClientModule,
    AngularSvgIconModule
  ],
  exports: [
    // CommonModule,
    HttpClientModule,
    AngularSvgIconModule
  ]
})
export class SharedModule { }
