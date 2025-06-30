import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { AdminPostService } from 'src/services/admin/post/admin.post.service';
import { CreatePostRequest } from 'src/models/admin/post/create-post-resquest.model';
import { UploadImage } from 'src/common/interceptors/upload/upload-image.interceptors';

@Controller('admin')
export class AdminPostController {
  constructor(private readonly adminPostService: AdminPostService) {}

  @Post('create-post')
  @UploadImage('admin', 'post-images')
  async createPost(
    @Body() postRequestData: CreatePostRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = Number(postRequestData.userId);
    postRequestData.userId = userId;
    if (
      !postRequestData.title ||
      !postRequestData.description ||
      !postRequestData.userId ||
      !postRequestData.image
    ) {
      try {
        const imagePath = file.path;
        const imageName = file.filename;
        const postResult = await this.adminPostService.addNewPost(
          postRequestData,
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
