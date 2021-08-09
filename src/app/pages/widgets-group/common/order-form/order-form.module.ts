import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AutoPartsFormComponent } from './components/auto-parts-form/auto-parts-form.component';
import { SubFormComponent } from './components/sub-form/sub-form.component';
import { CargoFormComponent } from './components/cargo-form/cargo-form.component';
import { CargosFormComponent } from './components/cargos-form/cargos-form.component';
import { CourierFormComponent } from './components/courier-form/courier-form.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { DeparturePointFormComponent } from './components/departure-point-form/departure-point-form.component';
import { DocsFormComponent } from './components/docs-form/docs-form.component';
import { EntityFormComponent } from './components/entity-form/entity-form.component';
import { IndividualFormComponent } from './components/individual-form/individual-form.component';
import { PackagingFormComponent } from './components/packaging-form/packaging-form.component';
import { ParcelFormComponent } from './components/parcel-form/parcel-form.component';
import { ParcelsFormComponent } from './components/parcels-form/parcels-form.component';
import { PickupPointFormComponent } from './components/pickup-point-form/pickup-point-form.component';
import { RecipientFormComponent } from './components/recipient-form/recipient-form.component';
import { SenderFormComponent } from './components/sender-form/sender-form.component';
import { ServicesFormComponent } from './components/services-form/services-form.component';
import {SharedModule} from '../../../../shared/shared.module';
import { OrderReportComponent } from './components/order-report/order-report.component';

@NgModule({
  declarations: [
    AuthorFormComponent,
    AutoPartsFormComponent,
    SubFormComponent,
    CargoFormComponent,
    CargosFormComponent,
    CourierFormComponent,
    DepartmentFormComponent,
    DeparturePointFormComponent,
    DocsFormComponent,
    EntityFormComponent,
    IndividualFormComponent,
    PackagingFormComponent,
    ParcelFormComponent,
    ParcelsFormComponent,
    PickupPointFormComponent,
    RecipientFormComponent,
    SenderFormComponent,
    ServicesFormComponent,
    OrderReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AuthorFormComponent,
    AutoPartsFormComponent,
    SubFormComponent,
    CargoFormComponent,
    CargosFormComponent,
    CourierFormComponent,
    DepartmentFormComponent,
    DeparturePointFormComponent,
    DocsFormComponent,
    EntityFormComponent,
    IndividualFormComponent,
    PackagingFormComponent,
    ParcelFormComponent,
    ParcelsFormComponent,
    PickupPointFormComponent,
    RecipientFormComponent,
    SenderFormComponent,
    ServicesFormComponent,
    OrderReportComponent
  ]
})
export class OrderFormModule { }
