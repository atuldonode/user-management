import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { SharedModule } from '../shared/shared.module';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { CountComponent } from './count/count.component';


@NgModule({
  declarations: [
    UserListComponent,
    AddEditUserComponent,
    MyCounterComponent,
    CountComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModuleModule { }
