import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserComponent } from './user/user.component';
import { SearchPipe } from '../../pipes/search.pipe';


@NgModule({
  declarations: [
    UserComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    FormsModule
  ]
})
export class UserModuleModule { }
