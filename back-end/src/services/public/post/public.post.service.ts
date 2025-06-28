import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/utils/prisma/prisma.service';
import { Post as PostModel } from '@prisma/client';

@Injectable()
export class PublicPostService {
  constructor(private readonly prisma: PrismaService) {}

  async searchPostById(postId: number): Promise<PostModel> {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!post || !post.published) {
        throw new NotFoundException('Post não encontrado ou não publicado');
      }

      return post;
    } catch (error) {
      throw new NotFoundException(error.message || 'Erro ao buscar o post');
    }
  }

  //   Retorna todos os posts publicados.
  async getAllPublished(): Promise<PostModel[]> {
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
