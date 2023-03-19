import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { UserDetailComponent } from '../user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserDetailComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateLayoutRoutingModule { }
