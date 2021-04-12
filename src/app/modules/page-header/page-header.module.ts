import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class PageHeaderModule { }
