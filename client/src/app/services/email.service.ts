import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserauthService } from './userauth.service';

const base_url = "http://localhost:3000/api/";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  token = '';
  constructor(private http: HttpClient, private auth: UserauthService) {
    this.token = this.auth.getToken();
  }

  //send email
  sendEmail(message,subject,emailAddresses):Observable<any>{
    return this.http.post<any>(`${base_url}correos/sendEmail?access_token=${this.token}`,{message,subject,emailAddresses});
  }

}
