import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import {SharedModule} from '../../shared/shared.module';
import { ValuesComponent } from './components/values/values.component';
import { SocialProjectComponent } from './components/social-project/social-project.component';
import { TeamComponent } from './components/team/team.component';
import {AboutPageComponent} from './about-page.component';
import { InNumbersComponent } from './components/in-numbers/in-numbers.component';



@NgModule({
  declarations: [
    AboutPageComponent,
    AboutComponent,
    ValuesComponent,
    SocialProjectComponent,
    TeamComponent,
    InNumbersComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AboutPageModule { }
