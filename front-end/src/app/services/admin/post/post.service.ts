import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './postModel';
import { CreatePostModel } from '../../../models/posts/createPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:3000/api/admin/manage-post/post';

  getPublishedPosts(): Observable<PostModel[]> {
    const params = new HttpParams().set('published', 'true');
    return this.http.get<PostModel[]>(this.apiUrl, { params });
  }

  getUnpublishedPosts(): Observable<PostModel[]> {
    const params = new HttpParams().set('published', 'false');
    return this.http.get<PostModel[]>(this.apiUrl, { params });
  }

  publishPost(id: string): Observable<PostModel> {
    return this.http.patch<PostModel>(`${this.apiUrl}/${id}/publish`, {});
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createPost(formData: FormData): Observable<HttpResponse<CreatePostModel>> {
    return this.http.post<CreatePostModel>(this.apiUrl, formData, {
      observe: 'response',
    });
  }
}
