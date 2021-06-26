import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {OrderPageComponent} from './order-page.component';
import { ParcelGroupComponent } from './components/form/parcel-group/parcel-group.component';
import { ParcelComponent } from './components/form/parcel/parcel.component';
import { AutoPartsComponent } from './components/form/auto-parts/auto-parts.component';
import { PackagingComponent } from './components/form/packaging/packaging.component';
import { ServicesComponent } from './components/form/services/services.component';



@NgModule({
  declarations: [
    OrderPageComponent,
    ParcelGroupComponent,
    ParcelComponent,
    AutoPartsComponent,
    PackagingComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrderPageModule { }
