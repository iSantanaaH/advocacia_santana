/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostService } from 'src/services/admin/create-post/create-post.service';
import { CreatePostDataModel } from './createPostDataModel';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/admin/createPost')
export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  @Post()
  @HttpCode(200)
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
    @Body() postData: CreatePostDataModel,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = Number(postData.userId);
    postData.userId = userId;
    console.log(postData);
    if (
      !postData.title ||
      !postData.description ||
      !postData.userId ||
      !postData.image
    ) {
      try {
        const imagePath = file.path;
        const imageName = file.filename;
        const postResult = await this.createPostService.postCreator(
          postData,
          imageName,
          imagePath,
        );
        return postResult;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      throw new BadRequestException('Preencha todos os campos!');
    }
  }
}
