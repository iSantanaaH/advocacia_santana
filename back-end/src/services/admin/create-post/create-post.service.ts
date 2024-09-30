import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDataModel } from 'src/controllers/admin/create-post/createPostDataModel';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class CreatePostService {
  constructor(private prisma: PrismaService) {}

  async postCreator(
    postData: CreatePostDataModel,
    imageName: string,
    imagePath: string,
  ) {
    const existingPost = await this.prisma.post.findUnique({
      where: {
        title: postData.title,
      },
    });

    if (existingPost) {
      throw new BadRequestException('Já existe um post com esse título');
    }

    const post = await this.prisma.post.create({
      data: {
        title: postData.title,
        description: postData.description,
        image_name: imageName,
        image_path: imagePath,
        author: {
          connect: { id: postData.userId },
        },
      },
    });
    console.log(`Post criado com sucesso! ${JSON.stringify(post)}`);
    return post;
  }
}
