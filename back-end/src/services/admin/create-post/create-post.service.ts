import { Injectable } from '@nestjs/common';
import { CreatePostDataModel } from 'src/controllers/admin/create-post/createPostDataModel';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CreatePostService {
  constructor(private prisma: PrismaService) {}

  async postCreator(postData: CreatePostDataModel) {
    const post = await this.prisma.post.create({
      data: {
        title: postData.title,
        description: postData.description,
        image: postData.image,
        author: {
          connect: { id: postData.userId },
        },
      },
    });
    return post;
  }
}
