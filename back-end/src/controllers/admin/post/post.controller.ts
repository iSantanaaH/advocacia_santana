import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from 'src/services/admin/post/post.admin.service';
import { Post as PostModel } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostModel } from 'src/models/post/CreatePostModel';

@Controller('admin')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('show-post')
  @HttpCode(200)
  async getPosts(@Query('published') published?: string): Promise<PostModel[]> {
    console.log(published);
    if (published === 'true') {
      return await this.postService.searchPublished();
    } else {
      return await this.postService.searchUnpublished();
    }
  }

  @Post('create-post')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/admin/posts',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createPost(
    @Body() postData: CreatePostModel,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = Number(postData.userId);
    postData.userId = userId;
    if (
      !postData.title ||
      !postData.description ||
      !postData.userId ||
      !postData.image
    ) {
      try {
        const imagePath = file.path;
        const imageName = file.filename;
        const postResult = await this.postService.addNewPost(
          postData,
          imageName,
          imagePath,
        );
        return { message: 'Post criado com sucesso!' };
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      throw new BadRequestException('Preencha todos os campos!');
    }
  }
}
