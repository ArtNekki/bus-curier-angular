import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultSimpleModalOptionConfig, defaultSimpleModalOptions, SimpleModalModule} from 'ngx-simple-modal';
import {SharedModule} from '../shared/shared.module';
import {SignInComponent} from './sign-in/sign-in.component';
import {LoginComponent} from './login/login.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignInComponent,
    CreateInvoiceComponent
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
    LoginComponent
  ],
  providers: [
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: { ...defaultSimpleModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true, wrapperClass: 'in show' } }
    },
  ]
})
export class ModalsModule { }
