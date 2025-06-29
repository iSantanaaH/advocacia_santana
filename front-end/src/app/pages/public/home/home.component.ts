import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/user/auth/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { PostResponse } from '../../../models/posts/post-response.model';
import { RouterLink } from '@angular/router';
import { PublicPostService } from '../../../services/public/public.post.service';

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
    private publicPostService: PublicPostService
  ) {
    authService.getUserRole();
  }

  ngOnInit(): void {
    this.publicPostService.getPublishedPosts().subscribe({
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
  public posts: PostResponse[] = [];

  searchResult: string = '';

  handleResult(query: string): void {
    this.searchResult = query;

    console.log('A query foi:', query);
  }
}
