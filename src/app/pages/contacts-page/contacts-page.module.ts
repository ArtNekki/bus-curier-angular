import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactsPageComponent} from './contacts-page.component';
import {SharedModule} from '../../shared/shared.module';
import { PointsListItemComponent } from './components/points-list-item/points-list-item.component';
import { ContactsMapComponent } from './components/contacts-map/contacts-map.component';
import { PointCardComponent } from './components/point-card/point-card.component';
import { PointsListComponent } from './components/points-list/points-list.component';



@NgModule({
  declarations: [
    ContactsPageComponent,
    PointsListItemComponent,
    ContactsMapComponent,
    PointCardComponent,
    PointsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ContactsPageModule { }
