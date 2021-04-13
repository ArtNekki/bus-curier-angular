import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFooterComponent } from './page-footer.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [PageFooterComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PageFooterComponent
  ]
})
export class PageFooterModule { }
