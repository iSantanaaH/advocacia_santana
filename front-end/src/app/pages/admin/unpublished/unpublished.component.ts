import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnPublishedDataModel } from '../../../services/posts/unpublished/unPublishedDataModel';
import { UnpublishedService } from '../../../services/posts/unpublished/unpublished.service';
import { HttpResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { ToastComponent } from '../../../components/toast/toast.component';

@Component({
  selector: 'app-unpublished',
  standalone: true,
  imports: [NgFor],
  templateUrl: './unpublished.component.html',
  styleUrls: ['./unpublished.component.css', 'unpublished-responsive.css'],
})
export class UnpublishedComponent implements OnDestroy, OnInit {
  ngOnInit(): void {
    this.getPosts();
  }

  constructor(private unpublishedService: UnpublishedService) {}
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  private subscription: Subscription = new Subscription();

  public posts: UnPublishedDataModel[] = [];

  public getPosts() {
    const getPostSub = this.unpublishedService.getUnpublishedPosts().subscribe({
      next: (httpResponse: HttpResponse<UnPublishedDataModel[]>) => {
        if (httpResponse.status === 200) {
          try {
            const responseBody = httpResponse.body;
            this.posts =
              responseBody?.map((post) => ({
                ...post,
                formattedDate: this.convertDateCreationPost(post.created_at),
              })) || [];
          } catch (error) {}
        }
      },
    });
    this.subscription.add(getPostSub);
    return this.posts;
  }

  public convertDateCreationPost(createdAt: Date) {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
