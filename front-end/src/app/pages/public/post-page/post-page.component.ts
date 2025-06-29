import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicPostService } from '../../../services/public/public.post.service';
import { PostResponse } from '../../../models/posts/post-response.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
  imports: [NgOptimizedImage],
  standalone: true,
})
export default class PostPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private publicPostService: PublicPostService
  ) {}

  post!: PostResponse;

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.publicPostService.getPostDetailsById(postId).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (err) => console.error('Erro ao buscar post', err.message),
    });
  }
}
