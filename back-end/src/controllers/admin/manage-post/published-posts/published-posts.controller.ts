import { Controller, HttpCode, Get, BadRequestException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PublishedPostsService } from 'src/services/admin/manage-post/published-posts/published-posts.service';

@Controller('api/admin/manage-posts/published-posts')
export class PublishedPostsController {
  constructor(private readonly publishedPostsService: PublishedPostsService) {}

  @Get()
  @HttpCode(200)
  async getPost(): Promise<Post[]> {
    try {
      const getPostResult =
        await this.publishedPostsService.getPublishedPosts();
      console.log(getPostResult);
      return getPostResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
