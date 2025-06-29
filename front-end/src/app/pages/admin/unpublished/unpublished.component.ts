import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { ToastComponent } from '../../../components/toast/toast.component';
import { AdminPostService } from '../../../services/admin/post/admin.post.service';
import { PostResponse } from '../../../models/posts/post-response.model';

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

  constructor(private adminPostService: AdminPostService) {}
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  private subscription: Subscription = new Subscription();

  public posts: PostResponse[] = [];

  public getPosts() {
    const getPostSub = this.adminPostService.getUnpublishedPosts().subscribe({
      next: (postModel: PostResponse[]) => {
        this.posts = postModel.map((post) => ({
          ...post,
          formattedDate: this.convertDateCreationPost(post.created_at),
        }));
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
