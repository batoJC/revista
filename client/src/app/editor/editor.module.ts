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

@NgModule({
  declarations: [EditorsComponent, AssesorsComponent, PublishingComponent, ArticlesComponent, StatisticsComponent],
  imports: [
    CommonModule,
    EditorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }
