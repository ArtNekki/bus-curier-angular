import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPromoComponent } from './components/main-promo/main-promo.component';
import {IndexPageComponent} from './index-page.component';
import {SharedModule} from '../../shared/shared.module';



@NgModule({
  declarations: [
    IndexPageComponent,
    MainPromoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class IndexPageModule { }
