import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { UnpublishedModel } from '../../../models/posts/unpublishedPostModel';
import { RouterLink } from '@angular/router';
import { AdminPostService } from '../../../services/admin/post/admin.post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    HeaderComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home-responsive.component.css'],
})
export default class HomeComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private adminPostService: AdminPostService
  ) {
    authService.getUserRole();
  }

  ngOnInit(): void {
    this.adminPostService.getPublishedPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar posts.';
        this.isLoading = false;
      },
    });
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
