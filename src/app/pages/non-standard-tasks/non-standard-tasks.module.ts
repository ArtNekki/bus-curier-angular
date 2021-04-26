import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NonStandardTasksComponent} from './non-standard-tasks.component';
import { CardComponent } from './components/card/card.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    NonStandardTasksComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class NonStandardTasksModule { }
