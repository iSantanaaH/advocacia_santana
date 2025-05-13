import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
} from '@nestjs/common';
import { PostService } from 'src/services/admin/manage-post/post/post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('api/admin/manage-post/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @HttpCode(200)
  async getPosts(@Query('published') published?: string): Promise<PostModel[]> {
    if (published === 'true') {
      return await this.postService.searchPublished();
    } else {
      return await this.postService.searchUnpublished();
    }
  }
}
