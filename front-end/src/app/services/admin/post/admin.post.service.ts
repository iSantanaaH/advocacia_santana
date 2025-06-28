import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './postModel';
import { CreatePostModel } from '../../../models/posts/createPost';
import { UnpublishedModel } from '../../../models/posts/unpublishedPostModel';
import {
  adminApiUrl,
  publicApiUrl,
} from '../../../shared/utils/url-builder.util';

@Injectable({
  providedIn: 'root',
})
export class AdminPostService {
  constructor(private http: HttpClient) {}

  // Admin;
  createPost(formData: FormData): Observable<HttpResponse<CreatePostModel>> {
    return this.http.post<CreatePostModel>(
      adminApiUrl('create-post'),
      formData,
      {
        observe: 'response',
      }
    );
  }

  getPublishedPosts(): Observable<PostModel[]> {
    const params = new HttpParams().set('published', 'true');
    return this.http.get<PostModel[]>(publicApiUrl('post/publisheds'), {
      params,
    });
  }

  getUnpublishedPosts(): Observable<UnpublishedModel[]> {
    const params = new HttpParams().set('published', 'false');
    return this.http.get<PostModel[]>(adminApiUrl('show-post'), {
      params,
    });
  }

  publishPost(id: string): Observable<PostModel> {
    return this.http.patch<PostModel>(
      `${adminApiUrl('manage-post')}/publish/${id}`,
      {}
    );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${adminApiUrl('manage-post')}/delete/${id}`);
  }

  // Public;
  getPostById(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${publicApiUrl('post-details')}/${id}`);
  }
}
