import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { CommentModel } from '../models/comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private articleService:ArticleService,private http:HttpClient) { }

  createNew(comment: CommentModel): Observable<CommentModel> {
    return this.http.post<CommentModel>(`${base_url}comments`, comment,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  countByArticle(id:string):Observable<any>{
    let filter = JSON.stringify({'article_id': id });
    return this.http.get<any>(`${base_url}comments/count?where=${filter}`,{
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

}
