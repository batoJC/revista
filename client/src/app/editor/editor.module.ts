import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { EditorsComponent } from './editors/editors.component';
import { AssesorsComponent } from './assesors/assesors.component';
import { EditionsComponent } from './editions/editions.component';
import { ArticlesComponent } from './articles/articles.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditorsComponent, AssesorsComponent, EditionsComponent, ArticlesComponent, StatisticsComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }
