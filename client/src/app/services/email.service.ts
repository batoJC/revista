import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const base_url = "http://localhost:3000/api/";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  //send email
  sendEmail(message,subject,emailAddresses):Observable<any>{
    return this.http.post<any>(`${base_url}correos/sendEmail`,{message,subject,emailAddresses});
  }

}
