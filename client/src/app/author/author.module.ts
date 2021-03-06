import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ArticleComponent, ListArticleComponent],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class AuthorModule { }
