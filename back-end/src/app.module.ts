import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/utils/prisma/prisma.service';
import { PrismaModule } from './services/utils/prisma/prisma.module';
import { HashService } from './services/utils/hash-service/hash-service';
import { AdminPostController } from './controllers/admin/post/admin.post.controller';
import { PostService } from './services/admin/post/post.admin.service';
import { UserController } from './controllers/public/user/user.controller';
import { UserService } from './services/public/user/user.service';
import { PublicPostController } from './controllers/public/post/public.post.controller';
import { PostUserService } from './services/public/user/post/post.user.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    AppController,
    AdminPostController,
    UserController,
    PublicPostController,
  ],
  providers: [
    AppService,
    PrismaService,
    HashService,
    PostService,
    UserService,
    PostUserService,
  ],
})
export class AppModule {}
