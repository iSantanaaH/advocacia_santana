import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { ToastComponent } from '../../../components/toast/toast.component';
import { PostService } from '../../../services/admin/post/post.service';
import { UnpublishedModel } from '../../../models/posts/unpublishedPostModel';

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

  constructor(private postService: PostService) {}
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  private subscription: Subscription = new Subscription();

  public posts: UnpublishedModel[] = [];

  public getPosts() {
    const getPostSub = this.postService.getUnpublishedPosts().subscribe({
      next: (postModel: UnpublishedModel[]) => {
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
