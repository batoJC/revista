import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http:HttpClient) { }

  createNew(file): Observable<any> {
    return this.http.post<any>(`${base_url}containers/pdf/upload`, file);
  }

  delete(file): Observable<any>{
    return this.http.delete<any>(`${base_url}containers/pdf/files/${file}`);
  }


}
 