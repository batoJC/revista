import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { LogedGuard } from '../guards/loged.guard';
import { AssesorGuard } from '../guards/assesor.guard';
import { AcceptComponent } from './accept/accept.component';
import { NotLoginGuard } from '../guards/not-login.guard';

const routes: Routes = [
  {
    path:'evaluar',
    component: ListArticlesComponent,
    canActivate:[
      LogedGuard,AssesorGuard
    ]
  },
  {
    path: 'confirmAsesor/:hash',
    component: AcceptComponent,
    canActivate :[
      NotLoginGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorRoutingModule { }
