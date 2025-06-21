import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { PostService } from '../../../services/admin/post/post.service';
import { UnpublishedModel } from '../../../models/posts/unpublishedPostModel';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home-responsive.component.css'],
})
export default class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.postService.getUnpublishedPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar posts.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  constructor(
    public authService: AuthService,
    private readonly postService: PostService
  ) {
    authService.getUserRole();
  }

  public isLoading = true;
  public error: string | null = null;
  public posts: UnpublishedModel[] = [];

  searchResult: string = '';

  handleResult(query: string): void {
    this.searchResult = query;

    console.log('A query foi:', query);
  }
}
