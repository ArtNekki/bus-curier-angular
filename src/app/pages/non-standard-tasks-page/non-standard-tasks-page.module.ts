import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NonStandardTasksPageComponent} from './non-standard-tasks-page.component';
import { CardComponent } from './components/card/card.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    NonStandardTasksPageComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class NonStandardTasksPageModule { }
