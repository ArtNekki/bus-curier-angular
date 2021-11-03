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
import { SwiperModule } from 'swiper/angular';

// mask
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> = {
  validation: true,
  dropSpecialCharacters: false,
  showMaskTyped: false,
  // clearIfNotMatch: true
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
import { TagComponent } from './components/tag/tag.component';
import { CounterComponent } from './components/counter/counter.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { FormTabsComponent } from './components/form-tabs/form-tabs.component';
import { ModalComponent } from './components/modal/modal.component';
import { OrderResultComponent } from './components/order-result/order-result.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReportComponent } from './components/report/report.component';
import { LocationComponent } from './components/location/location.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HelpBoxComponent } from './components/help-box/help-box.component';
import {NgxTippyModule} from 'ngx-tippy-wrapper';
import {
  RECAPTCHA_LANGUAGE,
  RECAPTCHA_SETTINGS,
  RECAPTCHA_V3_SITE_KEY,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
  RecaptchaV3Module
} from 'ng-recaptcha';
import { CitiesBlockComponent } from './components/cities-block/cities-block.component';
import { CitiesListComponent } from './components/cities-list/cities-list.component';

// import { ɵs } from '@ng-select/ng-select;

const RECAPTCHA_V3_STACKBLITZ_KEY = '6LeHBK0bAAAAAOQVTvBOWhfb08cQfUpFoSE3FsmP';
const RECAPTCHA_V2_DUMMY_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

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
    NgxTippyModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    SwiperModule
    // DeviceDetectorModule.forRoot(),
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    AngularSvgIconModule,
    NgxTippyModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    BtnComponent,
    SelectComponent,
    CheckboxComponent,
    DatepickerComponent,
    DataListComponent,
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
    RadioGroupComponent,
    ModalComponent,
    OrderResultComponent,
    PaginationComponent,
    ReportComponent,
    LoaderComponent,
    HelpBoxComponent,
    TabsComponent,
    CitiesBlockComponent,
    CitiesListComponent,
    SwiperModule
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
    RadioGroupComponent,
    FormTabsComponent,
    ModalComponent,
    OrderResultComponent,
    PaginationComponent,
    ReportComponent,
    LocationComponent,
    LoaderComponent,
    HelpBoxComponent,
    TabsComponent,
    CitiesBlockComponent,
    CitiesListComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: RECAPTCHA_V3_STACKBLITZ_KEY
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: RECAPTCHA_V2_DUMMY_KEY
      } as RecaptchaSettings
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'ru'
    },
  ],
})
export class SharedModule { }
