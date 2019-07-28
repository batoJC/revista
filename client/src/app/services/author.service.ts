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
    console.log('buu');
    return this.http.post<AuthorModel>(`${base_url}authors`,author,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

}
