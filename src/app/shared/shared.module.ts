import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { BtnComponent } from './components/btn/btn.component';
import { LinkComponent } from './components/link/link.component';
import { TextBoxComponent } from './components/text-box/text-box.component';
import { ImgComponent } from './components/img/img.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { SelectComponent } from './components/select/select.component';
import { SwitcherComponent } from './components/switcher/switcher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  imports: [
    // CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  exports: [
    // CommonModule,
    HttpClientModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    BtnComponent,
    LinkComponent,
    TextBoxComponent,
    ImgComponent
  ],
  declarations: [
    BtnComponent,
    LinkComponent,
    TextBoxComponent,
    ImgComponent,
    CheckboxComponent,
    DatepickerComponent,
    SelectComponent,
    SwitcherComponent
  ]
})
export class SharedModule { }
