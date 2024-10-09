import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostDataModel } from './createPostDataModel';

@Injectable({
  providedIn: 'root',
})
export class PostCreatorService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/admin/createPost';

  createPost(
    formData: FormData
  ): Observable<HttpResponse<CreatePostDataModel>> {
    return this.http.post<CreatePostDataModel>(this.apiUrl, formData, {
      observe: 'response',
    });
  }
}
