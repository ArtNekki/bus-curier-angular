import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {OrderPageComponent} from './order-page.component';
import { ParcelGroupComponent } from './components/form/parcel-group/parcel-group.component';
import { ParcelComponent } from './components/form/parcel/parcel.component';
import { AutoPartsComponent } from './components/form/auto-parts/auto-parts.component';
import { PackagingComponent } from './components/form/packaging/packaging.component';
import { ServicesComponent } from './components/form/services/services.component';
import { RecipientComponent } from './components/form/recipient/recipient.component';
import { IndividualComponent } from './components/form/individual/individual.component';



@NgModule({
  declarations: [
    OrderPageComponent,
    ParcelGroupComponent,
    ParcelComponent,
    AutoPartsComponent,
    PackagingComponent,
    ServicesComponent,
    RecipientComponent,
    IndividualComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrderPageModule { }
