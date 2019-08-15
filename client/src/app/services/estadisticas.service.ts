import { Injectable } from '@angular/core';
import { UserauthService } from './userauth.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssessorModel } from '../models/assessor.model';

const base_url = "http://localhost:3000/api/";


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  token = '';
  constructor(private http: HttpClient, private auth: UserauthService) {
    this.token = this.auth.getToken();
  }

  //método para contar evaluadores por especialidad
  findPorEspecialidad(especialidad: string): Observable<AssessorModel[]> {
    let filter = JSON.stringify({"where":{ 'specialty': especialidad }});
    return this.http.get<AssessorModel[]>(`${base_url}assessors?filter=${filter}&access_token=${this.token}`, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  countByPublishing(id: string,state:string): Observable<any> {
    let filter = JSON.stringify({ 'publishing_id': id,"state":state });
    return this.http.get<any>(`${base_url}articles/count?where=${filter}&access_token=${this.token}`, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  countByArticle(publishing: string,author:string): Observable<any> {
    let filter = JSON.stringify({ 'publishing_id': publishing,"author_id":author });
    return this.http.get<any>(`${base_url}articles/count?where=${filter}&access_token=${this.token}`, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

}
