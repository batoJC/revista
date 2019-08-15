import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorsComponent } from './editors/editors.component';
import { LogedGuard } from '../guards/loged.guard';
import { EditorGuard } from '../guards/editor.guard';
import { AssesorsComponent } from './assesors/assesors.component';
import { PublishingComponent } from './publishing/publishing.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ArticlesComponent } from './articles/articles.component';
import { EvaluadoresComponent } from './estadisticas/evaluadores/evaluadores.component';
import { EstadoComponent } from './estadisticas/estado/estado.component';
import { AceptacionComponent } from './estadisticas/aceptacion/aceptacion.component';
import { AutoresComponent } from './estadisticas/autores/autores.component';

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
    component: PublishingComponent,
    canActivate: [
      LogedGuard,EditorGuard
    ]
  },
  {
    path: 'articles/:edition',
    component: ArticlesComponent,
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
  },
  {
    path: 'evaluadorEstadisticas',
    component: EvaluadoresComponent,
    canActivate:[
      LogedGuard,EditorGuard
    ]
  },
  {
    path:'estadoEnvio/:id',
    component:EstadoComponent,
    canActivate:[
      LogedGuard,EditorGuard
    ]
  },
  {
    path: 'aceptacion',
    component : AceptacionComponent,
    canActivate:[
      LogedGuard,EditorGuard
    ]
  },
  {
    path: 'articulosPorAutor/:id',
    component : AutoresComponent,
    canActivate:[
      LogedGuard,EditorGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
