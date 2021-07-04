import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DocumentsPageComponent} from './documents-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    DocumentsPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DocumentsPageModule { }
