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

// import {DeviceDetectorModule} from 'ngx-device-detector';
import {AngularMyDatePickerModule} from 'angular-mydatepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
// import { ɵs } from '@ng-select/ng-select;



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMyDatePickerModule,
    AngularSvgIconModule,
    NgSelectModule,
    // DeviceDetectorModule.forRoot(),
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
  ],
  // providers: [NgSelectConfig, ɵs],
})
export class SharedModule { }
