import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DonePageComponent} from './pages/done-page/done-page.component';
import {FailPageComponent} from './pages/fail-page/fail-page.component';
import {QuickOrderPageComponent} from './quick-order-page.component';
import {IndexPageComponent} from './pages/index-page/index-page.component';

const routes: Routes = [
  {path: '', component: QuickOrderPageComponent, data: { title: 'Быстрый расчет' }, children: [
      { path: '', redirectTo: 'new', pathMatch: 'full'},
      { path: 'new', component: IndexPageComponent, data: { title: 'Новый' }},
      { path: 'new/:id/done', component: DonePageComponent, data: { title: 'Расчет завершен' }},
      { path: 'new/fail', component: FailPageComponent, data: { title: 'Ошибка расчета' }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickOrderRoutingModule { }
