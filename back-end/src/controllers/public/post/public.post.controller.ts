import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
} from '@nestjs/common';
import { PublicPostService } from 'src/services/public/post/public.post.service';
import { Post as PostModel } from '@prisma/client';

@Controller('public/post')
export class PublicPostController {
  constructor(private readonly publicPostService: PublicPostService) {}

  @Get(':id')
  async getPublishedPostById(@Param('id') id: string) {
    try {
      const postResult = await this.publicPostService.searchPostById(
        Number(id),
      );

      console.log(postResult);
      return postResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('show-post')
  @HttpCode(200)
  async getPosts(@Query('published') published?: string): Promise<PostModel[]> {
    if (published === 'true') {
      return await this.publicPostService.getAllPublished();
    }
  }
}
