import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createNew(user: UserModel):Observable<UserModel>{
    console.log('buu');
    return this.http.post<UserModel>(`${base_url}Users`,user,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

}
