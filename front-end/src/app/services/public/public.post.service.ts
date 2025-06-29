import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResponse } from '../../models/posts/post-response.model';
import { HttpClient } from '@angular/common/http';
import { publicApiUrl } from '../../shared/utils/url-builder.util';

@Injectable({
  providedIn: 'root',
})
export class PublicPostService {
  constructor(private http: HttpClient) {}

  getPublishedPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(publicApiUrl('posts/publisheds'));
  }

  getPostDetailsById(id: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${publicApiUrl('posts')}/${id}`);
  }
}
