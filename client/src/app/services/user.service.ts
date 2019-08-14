import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { UserauthService } from './userauth.service';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  token = '';
  constructor(private http: HttpClient, private auth: UserauthService) {
    this.token = this.auth.getToken();
  }

  createNew(user: UserModel):Observable<UserModel>{
    return this.http.post<UserModel>(`${base_url}Users?access_token=${this.token}`,user,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  findUser(id){
    return this.http.get<UserModel>(`${base_url}Users/${id}?access_token=${this.token}`);
  }

  //edit editor
  updateUser(user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${base_url}Users/${user.id}?access_token=${this.token}`, user);
  }

   //delete user
   deleteUser(userId: String): Observable<UserModel> {
    return this.http.delete<UserModel>(`${base_url}Users/${userId}?access_token=${this.token}`);
  };

  //find by email
  findByEmail(email:string):Observable<UserModel>{
    let filter = JSON.stringify({"where":{'email': email }});
    return this.http.get<UserModel>(`${base_url}Users/findOne/?filter=${filter}&access_token=${this.token}`,{
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  //find by rol
  findByRol(rol:number):Observable<UserModel[]>{
    let filter = JSON.stringify({"where":{'rol': rol }});
    return this.http.get<UserModel[]>(`${base_url}Users?filter=${filter}&access_token=${this.token}`,{
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

}
