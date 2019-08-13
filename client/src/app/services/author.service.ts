import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorModel } from '../models/author.model';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  createNew(author: AuthorModel):Observable<AuthorModel>{
    return this.http.post<AuthorModel>(`${base_url}authors`,author,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  findByUserId(id): Observable<AuthorModel>{
    let filter = JSON.stringify({"where":{'user_id': id }});
    return this.http.get<AuthorModel>(`${base_url}authors?filter=${filter}`);
  }

}
