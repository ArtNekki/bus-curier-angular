import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { BtnComponent } from './components/btn/btn.component';
import { LinkComponent } from './components/link/link.component';



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
    BtnComponent,
    LinkComponent
  ],
  declarations: [
    BtnComponent,
    LinkComponent
  ]
})
export class SharedModule { }
