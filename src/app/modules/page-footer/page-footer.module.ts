import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFooterComponent } from './page-footer.component';
import {SharedModule} from '../../shared/shared.module';
import {AppRoutingModule} from '../../app-routing.module';



@NgModule({
  declarations: [PageFooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    PageFooterComponent
  ]
})
export class PageFooterModule { }
