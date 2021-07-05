import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeedbackLinksPageComponent} from './feedback-links-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    FeedbackLinksPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FeedbackLinksPageModule { }
