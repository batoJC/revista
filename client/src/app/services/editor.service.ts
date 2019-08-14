import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EditorModel } from '../models/editor.model';
import { Observable } from 'rxjs';

const base_url = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private http: HttpClient) { }

  createNew(author: EditorModel): Observable<EditorModel> {
    return this.http.post<EditorModel>(`${base_url}editors`, author,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  // list of editors
  loadEditors(): Observable<EditorModel[]> {
    return this.http.get<EditorModel[]>(`${base_url}editors`);
  }

  //edit editor
  updateEditor(editor: EditorModel): Observable<EditorModel> {
    return this.http.put<EditorModel>(`${base_url}editors/${editor.id}`, editor,
      {
        headers: new HttpHeaders({
          "content-type": "application/json"
        })
      });
  }

  //delete editor
  deleteEditor(editorId: String): Observable<EditorModel> {
    return this.http.delete<EditorModel>(`${base_url}editors/${editorId}`);
  };

  findEditorById(id:string): Observable<EditorModel>{
    let filter = JSON.stringify({"where":{},"include":"user"});
    return this.http.delete<EditorModel>(`${base_url}editors/${id}?filter=${filter}`);
  }


}
