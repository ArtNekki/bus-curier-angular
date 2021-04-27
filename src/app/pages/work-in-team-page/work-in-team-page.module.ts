import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkInTeamPageComponent} from './work-in-team-page.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import {SharedModule} from '../../shared/shared.module';
import { DepartmentsComponent } from './components/departments/departments.component';
import { WorkBannerComponent } from './components/work-banner/work-banner.component';



@NgModule({
  declarations: [
    WorkInTeamPageComponent,
    AchievementsComponent,
    DepartmentsComponent,
    WorkBannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WorkInTeamPageModule { }
