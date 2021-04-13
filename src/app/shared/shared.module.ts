import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { BtnComponent } from './components/btn/btn.component';



@NgModule({
  imports: [
    // CommonModule,
    HttpClientModule,
    AngularSvgIconModule,
  ],
  exports: [
    // CommonModule,
    HttpClientModule,
    AngularSvgIconModule,
    BtnComponent
  ],
  declarations: [
    BtnComponent
  ]
})
export class SharedModule { }
