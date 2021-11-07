import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultSimpleModalOptionConfig, defaultSimpleModalOptions, SimpleModalModule} from 'ngx-simple-modal';
import {SharedModule} from '../shared/shared.module';
import {SignInModalComponent} from './sign-in-modal/sign-in-modal.component';
import {LoginModalComponent} from './login-modal/login-modal.component';
import { CreateInvoiceModalComponent } from './create-invoice-modal/create-invoice-modal.component';
import { InvoiceDoneModalComponent } from './invoice-done-modal/invoice-done-modal.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ManagerCallModalComponent } from './manager-call-modal/manager-call-modal.component';
import { CitiesModalComponent } from './cities-modal/cities-modal.component';
import { RegionsModalComponent } from './regions-modal/regions-modal.component';

@NgModule({
  declarations: [
    LoginModalComponent,
    SignInModalComponent,
    CreateInvoiceModalComponent,
    InvoiceDoneModalComponent,
    OrderModalComponent,
    ConfirmModalComponent,
    AlertModalComponent,
    ManagerCallModalComponent,
    CitiesModalComponent,
    RegionsModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SimpleModalModule.forRoot({container: document.body})
  ],
  exports: [
    SimpleModalModule
  ],
  entryComponents: [
    LoginModalComponent
  ],
  providers: [
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: { ...defaultSimpleModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true, wrapperClass: 'in show' } }
    },
  ]
})
export class ModalsModule { }
