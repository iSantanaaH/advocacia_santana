import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../../../models/posts/post-response.model';
import { PostCreateResponse } from '../../../models/posts/create-post-response.model';
import { adminApiUrl } from '../../../shared/utils/url-builder.util';

@Injectable({
  providedIn: 'root',
})
export class AdminPostService {
  constructor(private http: HttpClient) {}

  createPost(formData: FormData): Observable<HttpResponse<PostCreateResponse>> {
    return this.http.post<PostCreateResponse>(
      adminApiUrl('create-post'),
      formData,
      {
        observe: 'response',
      }
    );
  }

  getUnpublishedPosts(): Observable<PostResponse[]> {
    const params = new HttpParams().set('published', 'false');
    return this.http.get<PostResponse[]>(adminApiUrl('show-post'), {
      params,
    });
  }

  publishPost(id: string): Observable<PostResponse> {
    return this.http.patch<PostResponse>(
      `${adminApiUrl('manage-post')}/publish/${id}`,
      {}
    );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${adminApiUrl('manage-post')}/delete/${id}`);
  }
}
