import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssessorModel } from '../models/assessor.model';
import { Observable } from 'rxjs';
import { UserauthService } from './userauth.service';

const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class AssessorService {

  constructor(private http: HttpClient, private auth: UserauthService) {
    this.token = this.auth.getToken();
  }

  token = '';


  createNew(author: AssessorModel): Observable<AssessorModel> {
    return this.http.post<AssessorModel>(`${base_url}assessors?accessToken=${this.token}`, author,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  // list of assessors
  loadAssessors(): Observable<AssessorModel[]> {
    return this.http.get<AssessorModel[]>(`${base_url}assessors?accessToken=${this.token}`);
  }

  // list of assessors with state evaluador
  loadAssessorsAccepted(): Observable<AssessorModel[]> {
    let filter = JSON.stringify({ "where": { 'state': 'evaluador' }, "include": 'user' });
    return this.http.get<AssessorModel[]>(`${base_url}assessors?filter=${filter}&accessToken=${this.token}`);
  }

  //edit assessor
  updateAssessor(assessor: AssessorModel): Observable<AssessorModel> {
    return this.http.put<AssessorModel>(`${base_url}assessors/${assessor.id}?accessToken=${this.token}`, assessor,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  //delete assessor
  deleteAssessor(assessorId: String): Observable<AssessorModel> {
    return this.http.delete<AssessorModel>(`${base_url}assessors/${assessorId}?accessToken=${this.token}`);
  };

  findByIdUser(id: string): Observable<AssessorModel[]> {
    let filter = JSON.stringify({ "where": { 'user_id': id } });
    return this.http.get<AssessorModel[]>(`${base_url}assessors?filter=${filter}&accessToken=${this.token}`);
  }

  findByUserHash(hash): Observable<AssessorModel> {
    let filter = JSON.stringify({ "where": { 'hash': hash } });
    return this.http.get<AssessorModel>(`${base_url}assessors?filter=${filter}&accessToken=${this.token}`,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

}
