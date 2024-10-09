import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './controllers/user/register/register.controller';
import { LoginController } from './controllers/user/login/login.controller';
import { RegisterService } from './services/user/register/register.service';
import { LoginService } from './services/user/login/login.service';
import { PrismaService } from './services/prisma/prisma.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { CreatePostController } from './controllers/admin/create-post/create-post.controller';
import { CreatePostService } from './services/admin/create-post/create-post.service';
import { PublishedPostsController } from './controllers/admin/manage-post/published-posts/published-posts.controller';
import { UnpublishedPostsController } from './controllers/admin/manage-post/unpublished-posts/unpublished-posts.controller';
import { UnpublishedPostsService } from './services/admin/manage-post/unpublished-posts/unpublished-posts.service';
import { PublishedPostsService } from './services/admin/manage-post/published-posts/published-posts.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    AppController,
    RegisterController,
    LoginController,
    CreatePostController,
    PublishedPostsController,
    UnpublishedPostsController,
  ],
  providers: [
    AppService,
    RegisterService,
    LoginService,
    PrismaService,
    CreatePostService,
    UnpublishedPostsService,
    PublishedPostsService,
  ],
})
export class AppModule {}
