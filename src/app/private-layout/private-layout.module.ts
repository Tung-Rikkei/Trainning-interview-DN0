import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateLayoutRoutingModule } from './private-layout-routing.module';
import { CanDeactivateGuard } from '../can-deactivate.guard';


@NgModule({
  declarations: [],
  providers: [
    CanDeactivateGuard,
  ],
  imports: [
    CommonModule,
    PrivateLayoutRoutingModule
  ]
})
export class PrivateLayoutModule { }
