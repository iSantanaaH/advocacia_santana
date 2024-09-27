/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostService } from 'src/services/admin/create-post/create-post.service';
import { CreatePostDataModel } from './createPostDataModel';

@Controller('api/admin/createPost')
export class CreatePostController {
  constructor(private readonly createPostService: CreatePostService) {}

  @Post()
  @HttpCode(200)
  async createPost(@Body() postData: CreatePostDataModel) {
    if (postData) {
      try {
        const postResult = await this.createPostService.postCreator(postData);
        console.log(postResult);
        return postResult;
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
    } else {
      throw new BadRequestException('Preencha todos os campos!');
    }
  }
}
