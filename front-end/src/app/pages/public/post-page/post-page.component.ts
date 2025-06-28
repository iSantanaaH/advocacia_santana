import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPostService } from '../../../services/admin/post/admin.post.service';
import { PostModel } from '../../../services/admin/post/postModel';
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
    private adminPostService: AdminPostService
  ) {}

  post!: PostModel;

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminPostService.getPostById(postId).subscribe({
      next: (data) => {
        this.post = data;
      },
      error: (err) => console.error('Erro ao buscar post', err.message),
    });
  }
}
