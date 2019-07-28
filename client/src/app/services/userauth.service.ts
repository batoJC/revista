import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';


const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})

export class UserauthService {

  constructor(private http: HttpClient) { }

  tokenId: string = '';


  loginUser(email: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${base_url}Users/login?include=user`,
      {
        email,
        password
      },
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  logoutUser(){
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userTk");
    return true;
  }

  saveToken(token) {
    localStorage.setItem("userTk", token);
  }

  getToken() {
    return localStorage.getItem("userTk");
  }

  saveUserInformation(user: UserModel): void {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }

  getUserInformation() {
    let userInfo = localStorage.getItem("userInfo");
    if (isNullOrUndefined(userInfo)) {
      return null;
    }
    return (JSON.parse(userInfo));
  }


}
