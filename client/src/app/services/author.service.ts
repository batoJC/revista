import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorModel } from '../models/author.model';
import { UserauthService } from './userauth.service';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  token = '';
  constructor(private http: HttpClient, private auth: UserauthService) {
    this.token = this.auth.getToken();
  }

  createNew(author: AuthorModel): Observable<AuthorModel> {
    return this.http.post<AuthorModel>(`${base_url}authors?access_token=${this.token}`, author,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  findByUserId(id): Observable<AuthorModel> {
    let filter = JSON.stringify({ "where": { 'user_id': id } });
    return this.http.get<AuthorModel>(`${base_url}authors?filter=${filter}&access_token=${this.token}`);
  }

  findByUserHash(hash): Observable<AuthorModel> {
    let filter = JSON.stringify({ "where": { 'hash': hash } });
    return this.http.get<AuthorModel>(`${base_url}authors?filter=${filter}&access_token=${this.token}`,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  findById(id): Observable<AuthorModel> {
    let filter = JSON.stringify({ "where": { '_id': id }, 'include': 'user' });
    return this.http.get<AuthorModel>(`${base_url}authors?filter=${filter}&access_token=${this.token}`,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  //edit autor
  updateEditor(author: AuthorModel): Observable<AuthorModel> {
    return this.http.put<AuthorModel>(`${base_url}authors/${author.id}?access_token=${this.token}`, author,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

}
