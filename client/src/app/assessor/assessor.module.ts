import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { AssessorRoutingModule } from './assessor-routing.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { AcceptComponent } from './accept/accept.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ListArticlesComponent, AcceptComponent],
  imports: [
    CommonModule,
    AssessorRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AssessorModule { }
