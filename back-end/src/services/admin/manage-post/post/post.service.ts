import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/utils/prisma/prisma.service';
import { Post as PostModel } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  //   Pega todos os posts não publicados
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

  //   Pega todos os posts publicados
  async searchPublished(): Promise<PostModel[]> {
    try {
      const post = await this.prisma.post.findMany({
        where: {
          published: true,
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
}
