import { Injectable } from '@angular/core';
import { ArticleModel } from '../models/article.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommentModel } from '../models/comment.model';
import { UserauthService } from './userauth.service';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  token = '';

  constructor(private http: HttpClient,private auth: UserauthService) { 
    this.token = this.auth.getToken();
  }

  createNew(publishing: ArticleModel): Observable<ArticleModel> {
    let token = this.auth.getToken();
    return this.http.post<ArticleModel>(`${base_url}articles?access_token=${this.token}`, publishing,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  // list of articles for state and publishing
  loadPublishings(state:string,publishing:string): Observable<ArticleModel[]> {
    let filter = JSON.stringify({"where":{'publishing_id': publishing,'state':state }});
    return this.http.get<ArticleModel[]>(`${base_url}articles?filter=${filter}&access_token=${this.token}`);
  }

  // list of articles to publishing
  loadPublishingsById(publishing:string): Observable<ArticleModel[]> {
    let filter = JSON.stringify({"where":{'publishing_id': publishing},"include":"author"});
    return this.http.get<ArticleModel[]>(`${base_url}articles?filter=${filter}&access_token=${this.token}`);
  }

  //list public articles
  lista(publishing:string): Observable<ArticleModel[]> {
    let filter = JSON.stringify({"where":{'publishing_id': publishing,'state':'aceptado'},"include":"author"});
    return this.http.get<ArticleModel[]>(`${base_url}articles?filter=${filter}&access_token=${this.token}`);
  }

  // list of articles for author
  loadPublishing(author_id:string): Observable<ArticleModel[]> {
    let filter = JSON.stringify({"where":{'author_id': author_id }});
    return this.http.get<ArticleModel[]>(`${base_url}articles?filter=${filter}&access_token=${this.token}`);
  }

  //find information the article with id
  searchById(id:string):Observable<ArticleModel>{
    return this.http.get<ArticleModel>(`${base_url}articles/${id}?filter[include]=comments&access_token=${this.token}`);
  }

  //edit article
  update(article: ArticleModel):Observable<ArticleModel>{
    return this.http.put<ArticleModel>(`${base_url}articles/${article.id}?access_token=${this.token}`, article,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  //list of comments for one article
  comments(article:string): Observable<CommentModel[]>{
    return this.http.get<CommentModel[]>(`${base_url}articles/${article}/comments?filter[include]=assessor`);
  }

  // list of articles from assessor
  loadArticleByAssessor(assessor_id):Observable<ArticleModel[]>{
    let filter = JSON.stringify({"where":{'assessors': 'id'+assessor_id },'include':'author'});
    return this.http.get<ArticleModel[]>(`${base_url}articles?filter=${filter}`);
  }

}
