import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PublishedDataModel } from './publishedDataModel';

@Injectable({
  providedIn: 'root',
})
export class PublishedService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl: string =
    'http://localhost:3000/admin/manage-posts/published';

  getPublishedPosts(): Observable<HttpResponse<PublishedDataModel>> {
    return this.http.get<PublishedDataModel>(this.apiUrl, {
      observe: 'response',
    });
  }
}
