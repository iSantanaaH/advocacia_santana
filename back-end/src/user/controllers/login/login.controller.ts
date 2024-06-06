/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { LoginService } from 'src/user/services/login/login.service';

@Controller('api/auth-user/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async loginUser(@Body() userData: LoginDataModel) {
    if (userData) {
      try {
        const loginResult = await this.loginService.login(userData);

        return loginResult;
      } catch (error) {
        console.log(error.message);
      }
    } else {
      throw new BadRequestException('Preencha todos os campos');
    }
  }
}
