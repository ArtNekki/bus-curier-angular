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
import { EntityComponent } from './components/form/entity/entity.component';
import { SenderComponent } from './components/form/sender/sender.component';
import {DeparturePointComponent} from './components/form/departure-point/departure-point.component';
import { DepartmentComponent } from './components/form/department/department.component';
import { CourierComponent } from './components/form/courier/courier.component';
import { PickupPointComponent } from './components/form/pickup-point/pickup-point.component';
import { OrderReportComponent } from './components/form/order-report/order-report.component';
import { CargoComponent } from './components/form/cargo/cargo.component';
import { CargoGroupComponent } from './components/form/cargo-group/cargo-group.component';
import { AuthorComponent } from './components/form/author/author.component';
import { DocsComponent } from './components/form/docs/docs.component';
import { SidebarResultComponent } from './components/sidebar-result/sidebar-result.component';

@NgModule({
  declarations: [
    OrderPageComponent,
    ParcelGroupComponent,
    ParcelComponent,
    AutoPartsComponent,
    PackagingComponent,
    ServicesComponent,
    RecipientComponent,
    IndividualComponent,
    EntityComponent,
    SenderComponent,
    DeparturePointComponent,
    DepartmentComponent,
    CourierComponent,
    PickupPointComponent,
    OrderReportComponent,
    CargoComponent,
    CargoGroupComponent,
    AuthorComponent,
    DocsComponent,
    SidebarResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrderPageModule { }
