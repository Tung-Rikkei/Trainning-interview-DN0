import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateLayoutRoutingModule } from './private-layout-routing.module';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth/auth.interceptor';


@NgModule({
  declarations: [],
  providers: [
    CanDeactivateGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PrivateLayoutRoutingModule,
  ]
})
export class PrivateLayoutModule { }
