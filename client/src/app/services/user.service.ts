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
    return this.http.post<UserModel>(`${base_url}Users`,user,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  findUser(id,token){
    return this.http.get<UserModel>(`${base_url}Users/${id}?access_token=${token}`);
  }

  //edit editor
  updateUser(user: UserModel,token): Observable<UserModel> {
    return this.http.patch<UserModel>(`${base_url}Users/${user.id}?access_token=${token}`, user);
  }

   //delete user
   deleteUser(userId: String): Observable<UserModel> {
    return this.http.delete<UserModel>(`${base_url}Users/${userId}`);
  };

  //find by email
  findByEmail(email:string):Observable<UserModel>{
    let filter = JSON.stringify({"where":{'email': email }});
    return this.http.get<UserModel>(`${base_url}Users/findOne/?filter=${filter}`,{
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  //find by rol
  findByRol(rol:number):Observable<UserModel[]>{
    let filter = JSON.stringify({"where":{'rol': rol }});
    return this.http.get<UserModel[]>(`${base_url}Users?filter=${filter}`,{
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

}
