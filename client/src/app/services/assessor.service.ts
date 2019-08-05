import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AssessorModel } from '../models/assessor.model';
import { Observable } from 'rxjs';

const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class AssessorService {

  constructor(private http: HttpClient) { }

  createNew(author: AssessorModel): Observable<AssessorModel>{
    return this.http.post<AssessorModel>(`${base_url}assessors`, author, 
    {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  // list of assessors
  loadAssessors(): Observable<AssessorModel[]> {
    return this.http.get<AssessorModel[]>(`${base_url}assessors`);
  }

  //edit assessor
  updateAssessor(assessor: AssessorModel): Observable<AssessorModel> {
    return this.http.put<AssessorModel>(`${base_url}assessors/${assessor.id}`, assessor,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  //delete assessor
  deleteAssessor(assessorId: String): Observable<AssessorModel> {
    return this.http.delete<AssessorModel>(`${base_url}assessors/${assessorId}`);
  };
}
