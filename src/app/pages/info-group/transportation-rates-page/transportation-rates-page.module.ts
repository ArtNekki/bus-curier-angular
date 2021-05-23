import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {TransportationRatesPageComponent} from './transportation-rates-page.component';
import { RegionsBoxComponent } from './components/regions-box/regions-box.component';
import { CargoInfoComponent } from './components/cargo-info/cargo-info.component';

@NgModule({
  declarations: [
    TransportationRatesPageComponent,
    RegionsBoxComponent,
    CargoInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TransportationRatesPageModule { }
