import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import {SharedModule} from '../../shared/shared.module';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';

@NgModule({
  declarations: [PageHeaderComponent, MainNavComponent, MobileNavComponent, HeaderUserComponent, BreadcrumbsComponent, LocationSelectorComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PageHeaderComponent
  ]
})
export class PageHeaderModule { }
