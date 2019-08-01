import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorsComponent } from './editors/editors.component';
import { LogedGuard } from '../guards/loged.guard';
import { EditorGuard } from '../guards/editor.guard';
import { AssesorsComponent } from './assesors/assesors.component';
import { EditionsComponent } from './editions/editions.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  {
    path: 'editors',
    component: EditorsComponent,
    canActivate: [
      LogedGuard,EditorGuard
    ]
  },
  {
    path: 'assesors',
    component: AssesorsComponent,
    canActivate: [
      LogedGuard,EditorGuard
    ]
  },
  {
    path: 'editions',
    component: EditionsComponent,
    canActivate: [
      LogedGuard,EditorGuard
    ]
  },
  {
    path: 'articles/:edition',
    component: EditionsComponent,
    canActivate: [
      LogedGuard,EditorGuard
    ]
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [
      LogedGuard,EditorGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
