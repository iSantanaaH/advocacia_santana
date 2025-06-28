import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { AdminPostService } from 'src/services/admin/post/admin.post.service';
import { CreatePostModel } from 'src/models/post/CreatePostModel';
import { UploadImage } from 'src/common/interceptors/upload/upload-image.interceptors';

@Controller('admin')
export class AdminPostController {
  constructor(private readonly adminPostService: AdminPostService) {}

  @Post('create-post')
  @UploadImage('admin', 'post-images')
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
