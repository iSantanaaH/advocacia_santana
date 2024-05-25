import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterController } from './user/controllers/register/register.controller';
import { LoginController } from './user/controllers/login/login.controller';
import { RegisterService } from './user/services/register/register.service';
import { LoginService } from './user/services/login/login.service';

@Module({
  imports: [],
  controllers: [AppController, RegisterController, LoginController],
  providers: [AppService, RegisterService, LoginService],
})
export class AppModule {}
