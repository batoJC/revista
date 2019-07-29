import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ResetComponent } from './reset/reset.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NotLoginGuard } from '../guards/not-login.guard';
import { LogedGuard } from '../guards/loged.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate :[
      NotLoginGuard
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate :[
      NotLoginGuard
    ]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [
      LogedGuard
    ]
  },
  {
    path: 'reset',
    component: ResetComponent,
    canActivate :[
      NotLoginGuard
    ]
  },
  {
    path: 'confirm',
    component: ConfirmComponent,
    canActivate :[
      NotLoginGuard
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
