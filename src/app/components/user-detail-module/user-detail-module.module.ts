import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailModuleRoutingModule } from './user-detail-module-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';


@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserDetailModuleRoutingModule
  ]
})
export class UserDetailModuleModule { }
