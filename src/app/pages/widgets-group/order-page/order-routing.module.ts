import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormPageComponent} from './pages/form-page/form-page.component';
import {OrderPageComponent} from './order-page.component';
import {DonePageComponent} from './pages/done-page/done-page.component';
import {FailPageComponent} from './pages/fail-page/fail-page.component';

const routes: Routes = [
  {path: '', component: OrderPageComponent, data: { title: 'Оформление заявки' }, children: [
      { path: '', redirectTo: 'order', pathMatch: 'full'},
      { path: 'order', component: FormPageComponent, data: { title: 'Новая заявка' }},
      { path: 'order/:id/done', component: DonePageComponent, data: { title: 'Заявка оформлена' }},
      { path: 'order/fail', component: FailPageComponent, data: { title: 'Заявка не оформлена' }},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
