import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WorkInTeamComponent} from './work-in-team.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import {SharedModule} from '../../shared/shared.module';
import { DepartmentsComponent } from './components/departments/departments.component';
import { WorkBannerComponent } from './components/work-banner/work-banner.component';



@NgModule({
  declarations: [
    WorkInTeamComponent,
    AchievementsComponent,
    DepartmentsComponent,
    WorkBannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WorkInTeamModule { }
