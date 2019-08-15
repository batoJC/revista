import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EditorsComponent } from './editors/editors.component';
import { AssesorsComponent } from './assesors/assesors.component';
import { PublishingComponent } from './publishing/publishing.component';
import { ArticlesComponent } from './articles/articles.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EvaluadoresComponent } from './estadisticas/evaluadores/evaluadores.component';
import { EstadoComponent } from './estadisticas/estado/estado.component';
import { AceptacionComponent } from './estadisticas/aceptacion/aceptacion.component';
import { AutoresComponent } from './estadisticas/autores/autores.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [EditorsComponent, AssesorsComponent, PublishingComponent, ArticlesComponent, StatisticsComponent, EvaluadoresComponent, EstadoComponent, AceptacionComponent, AutoresComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class EditorModule { }
