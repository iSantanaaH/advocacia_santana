import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/utils/prisma/prisma.service';
import { PrismaModule } from './services/utils/prisma/prisma.module';
import { HashService } from './services/utils/hash-service/hash-service';
import { PostController } from './controllers/admin/post/post.controller';
import { PostService } from './services/admin/post/post.service';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, PostController, UserController],
  providers: [AppService, PrismaService, HashService, PostService, UserService],
})
export class AppModule {}
