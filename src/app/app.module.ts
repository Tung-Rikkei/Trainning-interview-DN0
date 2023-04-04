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
import { UserDetailComponent } from './private-layout/user-detail/user-detail.component';
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
import { PaginationComponent } from './share-components/pagination/pagination.component';
import { UserInfoHandleFormComponent } from './share-components/user-info-handle-form/user-info-handle-form.component';
import { PrivateLayoutModule } from './private-layout/private-layout.module';
import { PublicLayoutModule } from './public-layout/public-layout.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { authReducer } from './store/reducers/auth-reducer';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
    NzDividerModule,
    PrivateLayoutModule,
    PublicLayoutModule,
    AppRoutingModule,
    NzSpinModule,
    StoreModule.forRoot({ auth: authReducer }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
