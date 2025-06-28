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
import { AdminPostService } from 'src/services/admin/post/admin.post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostModel } from 'src/models/post/CreatePostModel';

@Controller('admin')
export class AdminPostController {
  constructor(private readonly adminPostService: AdminPostService) {}

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
        const postResult = await this.adminPostService.addNewPost(
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
