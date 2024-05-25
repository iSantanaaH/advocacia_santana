/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RegisterService } from 'src/user/services/register/register.service';

interface UserDataProps {
  name: string;
  email: string;
  password: string;
  birthdate: string;
  phone: string;
}

@Controller('api/auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userData: UserDataProps) {
    try {
      const result = await this.registerService.register(userData);

      return { message: 'Usuário registrado com sucesso', data: result };
    } catch (error) {
      throw new HttpException(
        'falha ao registrar usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
