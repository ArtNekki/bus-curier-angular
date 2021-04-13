import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPromoComponent } from './components/main-promo/main-promo.component';
import {IndexPageComponent} from './index-page.component';
import {SharedModule} from '../../shared/shared.module';
import { CoverageListComponent } from './components/coverage-list/coverage-list.component';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { IndexFormOrderComponent } from './components/index-form-order/index-form-order.component';
import { IndexFormCalculatorComponent } from './components/index-form-calculator/index-form-calculator.component';
import { IndexSliderComponent } from './components/index-slider/index-slider.component';
import { PartnersComponent } from './components/partners/partners.component';
import { ImagesBoxComponent } from './components/images-box/images-box.component';



@NgModule({
  declarations: [
    IndexPageComponent,
    MainPromoComponent,
    CoverageListComponent,
    ServicesListComponent,
    IndexFormOrderComponent,
    IndexFormCalculatorComponent,
    IndexSliderComponent,
    PartnersComponent,
    ImagesBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class IndexPageModule { }
