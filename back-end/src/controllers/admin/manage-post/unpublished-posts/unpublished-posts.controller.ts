import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common';
import { Post } from '@prisma/client';
import { UnpublishedPostsService } from 'src/services/admin/manage-post/unpublished-posts/unpublished-posts.service';

@Controller('api/admin/manage-posts/unpublished-posts')
export class UnpublishedPostsController {
  constructor(
    private readonly unPublishedPostsService: UnpublishedPostsService,
  ) {}

  @Get()
  @HttpCode(200)
  async getPost(): Promise<Post[]> {
    try {
      const getPostResult =
        await this.unPublishedPostsService.searchUnpublishedPosts();
      return getPostResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
