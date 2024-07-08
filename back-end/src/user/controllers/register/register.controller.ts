/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterService } from 'src/user/services/register/register.service';
import { UserDataProps } from 'src/user/services/register/userDataProps';

@Controller('api/auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userData: UserDataProps) {
    try {
      console.log(`dados recebidos: ${JSON.stringify(userData)}`);
      const result = await this.registerService.register(userData);
      console.log(result);

      return { message: 'usuário registrado com sucesso'! };
    } catch (error) {
      console.log(error.message);
      throw new HttpException(
        'falha ao registrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
