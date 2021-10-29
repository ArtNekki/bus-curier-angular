import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCitiesPipe } from './pipes/filter-cities.pipe';



@NgModule({
  declarations: [
    FilterCitiesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
