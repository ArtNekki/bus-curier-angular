import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import {SharedModule} from '../../shared/shared.module';
import {ParcelsPageComponent} from './parcels-page.component';
import { PickUpTabsComponent } from './components/pick-up-tabs/pick-up-tabs.component';


@NgModule({
  declarations: [
    ParcelsPageComponent,
    BannerComponent,
    PickUpTabsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ParcelsPageModule { }
