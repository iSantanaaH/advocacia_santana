import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/utils/prisma/prisma.service';
import { PrismaModule } from './services/utils/prisma/prisma.module';
import { HashService } from './services/utils/hash-service/hash-service';
import { AdminPostController } from './controllers/admin/post/admin.post.controller';
import { AdminPostService } from './services/admin/post/admin.post.service';
import { UserController } from './controllers/public/user/user.controller';
import { UserService } from './services/public/user/user.service';
import { PublicPostController } from './controllers/public/post/public.post.controller';
import { PublicPostService } from './services/public/post/public.post.service';

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
    AdminPostService,
    UserService,
    PublicPostService,
  ],
})
export class AppModule {}
