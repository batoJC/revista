import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './template/list/list.component';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { MessagesComponent } from './template/messages/messages.component';
import { LogedGuard } from './guards/loged.guard';
import { EditorGuard } from './guards/editor.guard';

const routes: Routes = [
  {
    path : '',
    component: ListComponent
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [
      LogedGuard,EditorGuard
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthModule,
    EditorModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
