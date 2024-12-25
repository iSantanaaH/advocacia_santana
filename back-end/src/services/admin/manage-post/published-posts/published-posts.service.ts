import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/utils/prisma/prisma.service';

@Injectable()
export class PublishedPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPublishedPosts() {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          published: true,
        },
      });

      if (posts.length === 0) {
        throw new BadRequestException('Nenhum post encontrado!');
      }
      return posts;
    } catch (error) {
      throw error;
    }
  }
}
