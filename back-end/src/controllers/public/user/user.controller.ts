import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { CadastroModel } from 'src/models/user/CadastroModel';
import { LoginModel } from 'src/models/user/LoginModel';
import { UserService } from 'src/services/public/user/user.service';

@Controller('public/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Faz o registro dos dados no banco;
  @Post('register')
  async registerUser(@Body() userData: CadastroModel) {
    try {
      const result = await this.userService.register(userData);

      return { message: 'usuário registrado com sucesso'! };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Faz o login do usuário;
  @Post('authentication')
  @HttpCode(200)
  async loginUser(@Body() userData: LoginModel) {
    if (userData) {
      try {
        const loginResult = await this.userService.login(userData);
        return loginResult;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      throw new BadRequestException('Preencha todos os campos');
    }
  }
}
