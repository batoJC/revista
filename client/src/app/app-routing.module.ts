import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './template/list/list.component';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  {
    path : '',
    component: ListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
