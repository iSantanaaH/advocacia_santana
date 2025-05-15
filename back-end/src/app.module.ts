import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './controllers/user/register/register.controller';
import { LoginController } from './controllers/user/login/login.controller';
import { RegisterService } from './services/user/register/register.service';
import { LoginService } from './services/user/login/login.service';
import { PrismaService } from './services/utils/prisma/prisma.service';
import { PrismaModule } from './services/utils/prisma/prisma.module';
import { HashService } from './services/utils/hash-service/hash-service';
import { PostController } from './controllers/admin/manage-post/post/post.controller';
import { PostService } from './services/admin/manage-post/post/post.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    AppController,
    RegisterController,
    LoginController,
    PostController,
  ],
  providers: [
    AppService,
    RegisterService,
    LoginService,
    PrismaService,
    HashService,
    PostService,
  ],
})
export class AppModule {}
