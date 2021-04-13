import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPromoComponent } from './components/main-promo/main-promo.component';
import {IndexPageComponent} from './index-page.component';
import {SharedModule} from '../../shared/shared.module';
import { CoverageListComponent } from './components/coverage-list/coverage-list.component';
import { ServicesListComponent } from './components/services-list/services-list.component';



@NgModule({
  declarations: [
    IndexPageComponent,
    MainPromoComponent,
    CoverageListComponent,
    ServicesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class IndexPageModule { }
