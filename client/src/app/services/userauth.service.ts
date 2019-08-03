import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import * as CryptoJS from 'crypto-js';



const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})

export class UserauthService {

  constructor(private http: HttpClient) { }

  tokenId: string = '';
  secretKey = 'una-contraseña';


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

  logoutUser() {
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
    let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
    console.log(encryptedData);
    localStorage.setItem("userInfo", encryptedData);
  }

  getUserInformation() {
    let userInfo = localStorage.getItem("userInfo");
    if(!isNullOrUndefined(userInfo)){
      let valor = CryptoJS.AES.decrypt(userInfo.toString(), this.secretKey);
      var textoDesencriptado = valor.toString(CryptoJS.enc.Utf8);
      return (JSON.parse(textoDesencriptado));
    }
    return userInfo;
  }


}
