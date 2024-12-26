import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnPublishedDataModel } from './unPublishedDataModel';

@Injectable({
  providedIn: 'root',
})
export class UnpublishedService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl: string =
    'http://localhost:3000/api/admin/manage-posts/unpublished-posts';

  getUnpublishedPosts(): Observable<HttpResponse<UnPublishedDataModel[]>> {
    return this.http.get<UnPublishedDataModel[]>(this.apiUrl, {
      observe: 'response',
    });
  }
}
