import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { LogoutComponent } from './logout/logout.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetComponent, LogoutComponent, ConfirmComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
