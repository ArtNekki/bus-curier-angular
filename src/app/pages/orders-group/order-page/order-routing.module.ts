import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormPageComponent} from './pages/form-page/form-page.component';
import {OrderPageComponent} from './order-page.component';
import {DonePageComponent} from './pages/done-page/done-page.component';
import {FailPageComponent} from './pages/fail-page/fail-page.component';

const routes: Routes = [
  {path: '', component: OrderPageComponent, data: { title: 'Заявка' }, children: [
      { path: '', redirectTo: 'new', pathMatch: 'full'},
      { path: 'new', component: FormPageComponent, data: { title: 'Новая' }},
      { path: 'new/:id/done', component: DonePageComponent, data: { title: 'Заявка оформлена' }},
      { path: 'new/fail', component: FailPageComponent, data: { title: 'Заявка не оформлена' }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
