import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OurServicesPageComponent} from './our-services-page.component';
import {SharedModule} from '../../shared/shared.module';
import { TrafficComponent } from './components/traffic/traffic.component';
import { ServicesComponent } from './components/services/services.component';



@NgModule({
  declarations: [
    OurServicesPageComponent,
    TrafficComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OurServicesPageModule { }
