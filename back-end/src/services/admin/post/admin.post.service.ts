import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/utils/prisma/prisma.service';
import { Post as PostModel } from '@prisma/client';
import { CreatePostModel } from 'src/models/post/CreatePostModel';

@Injectable()
export class AdminPostService {
  constructor(private readonly prisma: PrismaService) {}
  //   Retorna todos os posts não publicados.
  async searchUnpublished(): Promise<PostModel[]> {
    try {
      const post = await this.prisma.post.findMany({
        where: {
          published: false,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });

      if (post.length === 0) {
        throw new BadRequestException('Nehum post foi encontrado');
      }
      return post;
    } catch (error) {
      throw error;
    }
  }

  // Cria um novo post.
  async addNewPost(
    postData: CreatePostModel,
    imageName: string,
    imagePath: string,
  ) {
    const existingPost = await this.prisma.post.findUnique({
      where: {
        title: postData.title,
      },
    });

    if (existingPost) {
      throw new BadRequestException('Já existe um post com esse titulo');
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

    return post;
  }
}
