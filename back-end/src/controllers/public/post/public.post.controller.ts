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

@Controller('posts')
export class PublicPostController {
  constructor(private readonly publicPostService: PublicPostService) {}

  @Get('publisheds')
  @HttpCode(200)
  async getPosts(): Promise<PostModel[]> {
    return await this.publicPostService.getAllPublished();
  }

  @Get(':id')
  async getPublishedPostById(@Param('id') id: string) {
    try {
      const postResult = await this.publicPostService.searchPostById(
        Number(id),
      );

      return postResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
