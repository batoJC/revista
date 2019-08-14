import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublishingModel } from '../models/publishing.model';
import { Observable } from 'rxjs';
import { UserauthService } from './userauth.service';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class PublishingService {

  token = '';
  constructor(private http: HttpClient, private auth: UserauthService) {
    this.token = this.auth.getToken();
  }


  createNew(publishing: PublishingModel): Observable<PublishingModel> {
    return this.http.post<PublishingModel>(`${base_url}publishings?access_token=${this.token}`, publishing,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  // list of publishings
  loadPublishings(): Observable<PublishingModel[]> {
    return this.http.get<PublishingModel[]>(`${base_url}publishings?access_token=${this.token}`);
  }

  //edit publishing
  updatePublishing(publishing: PublishingModel): Observable<PublishingModel> {
    return this.http.put<PublishingModel>(`${base_url}publishings/${publishing.id}?access_token=${this.token}`, publishing,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  //delete publishing
  deletePublishing(publishingId: String): Observable<PublishingModel> {
    return this.http.delete<PublishingModel>(`${base_url}publishings/${publishingId}?access_token=${this.token}`);
  };

  //search publishing
  searchPublishing(id: string): Observable<PublishingModel> {
    return this.http.get<PublishingModel>(`${base_url}publishings/${id}?access_token=${this.token}`)

  }

  //search a publishing active
  getActive(): Observable<PublishingModel> {
    try {
      let filter = JSON.stringify({ "where": { 'state': true } });
      return this.http.get<PublishingModel>(`${base_url}publishings/findOne?filter=${filter}`);
    } catch (exp) {
      return null;
    }
  }

  //poner todas las ediciones en false
  setState(): Observable<any> {
    return this.http.post<any>(`${base_url}publishings/update?where={}&access_token=${this.token}`, { "state": false });
  }


}
