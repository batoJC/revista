import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserauthService } from './userauth.service';

const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  token = '';
  constructor(private http: HttpClient, private auth: UserauthService) {
    this.token = this.auth.getToken();
  }

  createNew(file): Observable<any> {
    return this.http.post<any>(`${base_url}containers/pdf/upload?access_token=${this.token}`, file);
  }

  delete(file): Observable<any>{
    return this.http.delete<any>(`${base_url}containers/pdf/files/${file}?access_token=${this.token}`);
  }


}
 