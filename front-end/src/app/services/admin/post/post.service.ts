import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './postModel';
import { CreatePostModel } from '../../../models/posts/createPost';
import { UnpublishedModel } from '../../../models/posts/unpublishedPostModel';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:3000/api';

  // Montar Url dinâmica confome a função;
  private buildUrl(scope: 'admin' | 'public', path: string): string {
    return `${this.apiUrl}/${scope}/${path}`;
  }

  // Admin;
  createPost(formData: FormData): Observable<HttpResponse<CreatePostModel>> {
    return this.http.post<CreatePostModel>(this.apiUrl, formData, {
      observe: 'response',
    });
  }

  getPublishedPosts(): Observable<PostModel[]> {
    const params = new HttpParams().set('published', 'true');
    return this.http.get<PostModel[]>(this.buildUrl('admin', 'manage-post'), {
      params,
    });
  }

  getUnpublishedPosts(): Observable<UnpublishedModel[]> {
    const params = new HttpParams().set('published', 'false');
    return this.http.get<PostModel[]>(this.buildUrl('admin', 'manage-post'), {
      params,
    });
  }

  publishPost(id: string): Observable<PostModel> {
    return this.http.patch<PostModel>(
      `${this.buildUrl('admin', 'manage-post')}/publish/${id}`,
      {}
    );
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.buildUrl('admin', 'manage-post')}/delete/${id}`
    );
  }

  // Public;
  getPostById(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(
      `${this.buildUrl('public', 'post-details')}/${id}`
    );
  }
}
