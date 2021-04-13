import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [PageHeaderComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class PageHeaderModule { }
