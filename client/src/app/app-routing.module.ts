import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './template/list/list.component';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { MessagesComponent } from './template/messages/messages.component';
import { LogedGuard } from './guards/loged.guard';
import { EditorGuard } from './guards/editor.guard';
import { AuthorModule } from './author/author.module';
import { AssessorModule } from './assessor/assessor.module';
import { NotFoundComponent } from './template/not-found/not-found.component';

const routes: Routes = [
  {
    path : '',
    component: ListComponent
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [
      LogedGuard
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    AuthorModule,
    EditorModule,
    AssessorModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
