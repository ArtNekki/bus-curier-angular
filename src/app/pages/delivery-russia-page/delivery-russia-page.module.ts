import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalcBoxComponent } from './components/calc-box/calc-box.component';
import {SharedModule} from '../../shared/shared.module';
import {DeliveryRussiaPageComponent} from './delivery-russia-page.component';
import { KceServicesComponent } from './components/kce-services/kce-services.component';
import { KceMapComponent } from './components/kce-map/kce-map.component';



@NgModule({
  declarations: [
    DeliveryRussiaPageComponent,
    CalcBoxComponent,
    KceServicesComponent,
    KceMapComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DeliveryRussiaPageModule { }
