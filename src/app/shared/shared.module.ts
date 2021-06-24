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
import { AgmCoreModule } from '@agm/core';

// mask
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> = {
  validation: true,
  dropSpecialCharacters: false,
  showMaskTyped: true
};

// import {DeviceDetectorModule} from 'ngx-device-detector';
import {AngularMyDatePickerModule} from 'angular-mydatepicker';
import {NgSelectModule} from '@ng-select/ng-select';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SliderComponent } from './components/slider/slider.component';
import { MediaComponent } from './components/media/media.component';
import { TableComponent } from './components/table/table.component';
import { AlertComponent } from './components/alert/alert.component';
import { ListComponent } from './components/list/list.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { RadioComponent } from './components/radio/radio.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { OrderStepsComponent } from './components/order-steps/order-steps.component';
import { BoxComponent } from './components/box/box.component';
import { AccordeonComponent } from './components/accordeon/accordeon.component';
import { ContactBoxComponent } from './components/contact-box/contact-box.component';
import { MapComponent } from './components/map/map.component';
import {environment} from '../../environments/environment';
import { InputComponent } from './components/input/input.component';
import { SupportFormComponent } from './components/support-form/support-form.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabItemComponent } from './components/tabs/tab-item/tab-item.component';
import { TabLabelComponent } from './components/tabs/tab-label/tab-label.component';
import { TabBodyComponent } from './components/tabs/tab-body/tab-body.component';
import {TabsModule} from './components/tabs/tabs.module';
import { TagComponent } from './components/tag/tag.component';
import { CounterComponent } from './components/counter/counter.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
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
    AgmCoreModule.forRoot({
      apiKey: environment.firebaseConfig.apiKey,
      libraries: ['places']
    }),
    NgxMaskModule.forRoot(options),
    TabsModule
    // DeviceDetectorModule.forRoot(),
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    BtnComponent,
    SelectComponent,
    CheckboxComponent,
    DatepickerComponent,
    MediaComponent,
    TableComponent,
    LinkComponent,
    TextBoxComponent,
    ImgComponent,
    SliderComponent,
    AlertComponent,
    ListComponent,
    PreloaderComponent,
    RadioComponent,
    InfoBoxComponent,
    OrderStepsComponent,
    BoxComponent,
    AccordeonComponent,
    ContactBoxComponent,
    MapComponent,
    InputComponent,
    SupportFormComponent,
    TagComponent,
    CounterComponent,
    RadioGroupComponent
  ],
  declarations: [
    BtnComponent,
    LinkComponent,
    MediaComponent,
    TextBoxComponent,
    ImgComponent,
    CheckboxComponent,
    DatepickerComponent,
    SelectComponent,
    SwitcherComponent,
    TextareaComponent,
    SliderComponent,
    MediaComponent,
    TableComponent,
    AlertComponent,
    ListComponent,
    PreloaderComponent,
    RadioComponent,
    InfoBoxComponent,
    DataListComponent,
    OrderStepsComponent,
    BoxComponent,
    AccordeonComponent,
    ContactBoxComponent,
    MapComponent,
    InputComponent,
    SupportFormComponent,
    TagComponent,
    CounterComponent,
    RadioGroupComponent
  ],
  // providers: [NgSelectConfig, ɵs],
})
export class SharedModule { }
