/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { LoginService } from 'src/services/user/login/login.service';

@Controller('api/auth/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async loginUser(@Body() userData: LoginDataModel) {
    if (userData) {
      try {
        const loginResult = await this.loginService.login(userData);
        return loginResult;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      throw new BadRequestException('Preencha todos os campos');
    }
  }
}
