import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';
import { LogedGuard } from '../guards/loged.guard';
import { AuthorGuard } from '../guards/author.guard';
import { ListArticleComponent } from './list-article/list-article.component';

const routes: Routes = [
  {
    path:'addArticle',
    component: ArticleComponent,
    canActivate: [
      LogedGuard,AuthorGuard
    ]
  },
  {
    path: 'editArticle/:id',
    component : ArticleComponent,
    canActivate: [
      LogedGuard,AuthorGuard
    ]
  },
  {
    path: 'listArticles',
    component: ListArticleComponent,
    canActivate: [
      LogedGuard,AuthorGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
