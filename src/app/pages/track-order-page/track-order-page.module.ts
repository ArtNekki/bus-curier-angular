import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TrackOrderPageComponent} from './track-order-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    TrackOrderPageComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TrackOrderPageModule { }
