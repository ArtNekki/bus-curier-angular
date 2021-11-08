import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {IndexPageComponent} from './pages/index-page/index-page.component';
import {NonStandardTasksPageComponent} from './non-standard-tasks-page.component';
import {PostPageComponent} from './pages/post-page/post-page.component';

const routes: Routes = [
  {path: '', component: NonStandardTasksPageComponent, data: {title: 'Реализация нестандартных логистических задач'},
     children: [
      {path: '', redirectTo: '/services/non-standard-tasks', pathMatch: 'full'},
      {path: '', component: IndexPageComponent, data: {title: 'Реальные примеры'}},
      {path: 'post/:id', component: PostPageComponent, data: {title: 'Статья'}},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonStandardTasksRoutingModule { }
