import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { AssessorRoutingModule } from './assessor-routing.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';

@NgModule({
  declarations: [ListArticlesComponent],
  imports: [
    CommonModule,
    AssessorRoutingModule,
    ReactiveFormsModule
  ]
})
export class AssessorModule { }
