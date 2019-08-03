import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublishingModel } from '../models/publishing.model';
import { Observable } from 'rxjs';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class PublishingService {

  constructor(private http: HttpClient) { }


  createNew(publishing: PublishingModel): Observable<PublishingModel> {
    return this.http.post<PublishingModel>(`${base_url}publishings`, publishing,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  // list of publishings
  loadPublishings(): Observable<PublishingModel[]> {
    return this.http.get<PublishingModel[]>(`${base_url}publishings`);
  }

  //edit publishing
  updatePublishing(publishing: PublishingModel): Observable<PublishingModel> {
    return this.http.put<PublishingModel>(`${base_url}publishings/${publishing.id}`, publishing,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  //delete publishing
  deletePublishing(publishingId: String): Observable<PublishingModel> {
    return this.http.delete<PublishingModel>(`${base_url}publishings/${publishingId}`);
  };

  //searcha publishing
  searchPublishing(id:string): Observable<PublishingModel>{
    return this.http.get<PublishingModel>(`${base_url}publishings/${id}`)
    
  }

}
