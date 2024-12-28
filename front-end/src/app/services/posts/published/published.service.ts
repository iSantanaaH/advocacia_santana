import { HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PublishedDataModel } from './publishedDataModel';

@Injectable({
  providedIn: 'root',
})
export class PublishedService {
  constructor(private http: HttpClient) {}

  private readonly apiUrl: string =
    'http://localhost:3000/admin/manage-posts/published';
  private subscription: Subscription = new Subscription();

  public POSTS: PublishedDataModel[] = [];

  callPostsAPI(): Observable<HttpResponse<PublishedDataModel>> {
    return this.http.get<PublishedDataModel>(this.apiUrl, {
      observe: 'response',
    });
  }

  // getPosts() {
  //   const getPostSub = this.callPostsAPI().subscribe({
  //     next: (httpResponse: HttpResponse<PublishedDataModel>) => {
  //       if (httpResponse.status === 200) {
  //         try {
  //           const responseBody = httpResponse.body;
  //           this.POSTS = responseBody || [];
  //         }
  //       }
  //     }
  //   })
  // }
}
