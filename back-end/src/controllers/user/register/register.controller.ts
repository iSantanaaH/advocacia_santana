/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from 'src//services/user/register/register.service';
import { CadastroModel } from 'src/models/user/CadastroModel';

@Controller('api/auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userData: CadastroModel) {
    try {
      const result = await this.registerService.register(userData);

      return { message: 'usuário registrado com sucesso'! };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
