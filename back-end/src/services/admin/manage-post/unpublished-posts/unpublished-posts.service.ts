import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UnpublishedPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUnpublishedPosts(): Promise<Post[]> {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          published: false,
        },
      });

      if (posts.length === 0) {
        throw new BadRequestException('Nenhum post encontrado');
      }

      return posts;
    } catch (error) {
      throw error;
    }
  }
}
