import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './postModel';
import { CreatePostModel } from '../../../models/posts/createPost';
import { UnpublishedModel } from '../../../models/posts/unpublishedPostModel';
import { buildApiUrl } from '../../../shared/utils/url-builder.util';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  // Admin;
  createPost(formData: FormData): Observable<HttpResponse<CreatePostModel>> {
    return this.http.post<CreatePostModel>(
      buildApiUrl('admin', 'create-post'),
      formData,
      {
        observe: 'response',
      }
    );
  }

  getPublishedPosts(): Observable<PostModel[]> {
    const params = new HttpParams().set('published', 'true');
    return this.http.get<PostModel[]>(buildApiUrl('admin', 'show-post'), {
      params,
    });
  }

  getUnpublishedPosts(): Observable<UnpublishedModel[]> {
    const params = new HttpParams().set('published', 'false');
    return this.http.get<PostModel[]>(buildApiUrl('admin', 'show-post'), {
      params,
    });
  }

  publishPost(id: string): Observable<PostModel> {
    return this.http.patch<PostModel>(
      `${buildApiUrl('admin', 'manage-post')}/publish/${id}`,
      {}
    );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(
      `${buildApiUrl('admin', 'manage-post')}/delete/${id}`
    );
  }

  // Public;
  getPostById(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(
      `${buildApiUrl('public', 'post-details')}/${id}`
    );
  }
}
