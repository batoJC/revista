import { Injectable } from '@angular/core';
import { ArticleModel } from '../models/article.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = 'http://localhost:3000/api/';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { 

  }

  // list of articles for state and publishing
  loadPublishings(state:string,publishing:string): Observable<ArticleModel[]> {
    
    let filter = JSON.stringify({"where":{'publishing_id': publishing,'state':state }});
    // let filter2 = JSON.stringify({"where": });
    return this.http.get<ArticleModel[]>(`${base_url}articles?filter=${filter}`);
    // return this.http.get<ArticleModel[]>(`${base_url}articles?filter[where][and][0][state]=${state}&filter[where][and][1][publishing_id]=${publishing}`);
    // ?filter[where][and][0][title]=My%20Post&filter[where][and][1][content]=Hello
  }

}
