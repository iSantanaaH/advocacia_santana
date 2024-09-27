import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreatePostResponse } from './createPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostCreatorService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000/api/admin/createPost';

  createPost(
    title: string,
    description: string,
    image: string
  ): Observable<HttpResponse<CreatePostResponse>> {
    return this.http.post<CreatePostResponse>(
      this.apiUrl,
      { title, description, image },
      { observe: 'response' }
    );
  }
}
