import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NonStandardTasksPageComponent} from './non-standard-tasks-page.component';
import { CardComponent } from './components/card/card.component';
import {SharedModule} from '../../../shared/shared.module';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import {NonStandardTasksRoutingModule} from './non-standard-tasks-routing.module';



@NgModule({
  declarations: [
    NonStandardTasksPageComponent,
    CardComponent,
    IndexPageComponent,
    PostPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NonStandardTasksRoutingModule
  ]
})
export class NonStandardTasksPageModule { }
