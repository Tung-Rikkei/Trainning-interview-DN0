import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { PaginationComponent } from './pagination/pagination.component';
import { UserInfoHandleFormComponent } from './user-info-handle-form/user-info-handle-form.component';
import { PrivateLayoutModule } from './private-layout/private-layout.module';
import { PublicLayoutModule } from './public-layout/public-layout.module';
import { AuthService } from './auth.service';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    PaginationComponent,
    UserInfoHandleFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzTableModule,
    NzPaginationModule,
    NzInputModule,
    NzIconModule,
    NzCheckboxModule,
    NzButtonModule,
    NzModalModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
    NzDividerModule,
    PrivateLayoutModule,
    PublicLayoutModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
