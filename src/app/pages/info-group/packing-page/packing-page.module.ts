import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackingPageComponent} from './packing-page.component';
import { PackageBlockComponent } from './components/package-block/package-block.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [
    PackingPageComponent,
    PackageBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PackingPageModule { }
