import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization/authorization.component';
import {DefaultSimpleModalOptionConfig, defaultSimpleModalOptions, SimpleModalModule} from 'ngx-simple-modal';
import {SharedModule} from '../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AuthorizationComponent,
    RegistrationComponent
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
    AuthorizationComponent
  ],
  providers: [
    {
      provide: DefaultSimpleModalOptionConfig,
      useValue: { ...defaultSimpleModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true, wrapperClass: 'in show' } }
    },
  ]
})
export class ModalsModule { }
