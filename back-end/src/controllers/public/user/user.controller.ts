import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { SignUpUserRequest } from 'src/models/public/user/sign-up-user-request.model';
import { AuthUserResquest } from 'src/models/public/user/sign-in-user-request.model';
import { UserService } from 'src/services/public/user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Faz o registro dos dados no banco;
  @Post('register')
  async registerUser(@Body() userData: SignUpUserRequest) {
    try {
      const result = await this.userService.signUp(userData);

      return { message: 'usuário registrado com sucesso'! };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Faz o login do usuário;
  @Post('authentication')
  @HttpCode(200)
  async loginUser(@Body() authUserData: AuthUserResquest) {
    if (authUserData) {
      try {
        const tokenAcess = await this.userService.signIn(authUserData);
        console.log(tokenAcess);
        return tokenAcess;
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    } else {
      throw new BadRequestException('Preencha todos os campos');
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getUserProfile(@Req() req: Request) {
    const user = req.user;
    return { user };
  }
}
