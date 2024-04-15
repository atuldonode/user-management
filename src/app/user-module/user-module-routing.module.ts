import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { CountComponent } from './count/count.component';

const routes: Routes = [
  // { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  { path: '', component: UserListComponent },
  { path: 'add-user', component: AddEditUserComponent },
  { path: 'edit-user/:id', component: AddEditUserComponent },
  { path: 'count', component: CountComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
