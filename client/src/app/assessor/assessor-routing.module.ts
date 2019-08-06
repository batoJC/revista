import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { LogedGuard } from '../guards/loged.guard';
import { AssesorGuard } from '../guards/assesor.guard';

const routes: Routes = [
  {
    path:'evaluar',
    component: ListArticlesComponent,
    canActivate:[
      LogedGuard,AssesorGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessorRoutingModule { }
