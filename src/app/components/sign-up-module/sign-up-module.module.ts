import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignUpModuleRoutingModule } from './sign-up-module-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpModuleRoutingModule,
    ReactiveFormsModule
  ]
})
export class SignUpModuleModule { }
