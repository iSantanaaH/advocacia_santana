/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from 'src/controllers/admin/create-post/user/services/register/register.service';
import { UserDataProps } from 'src/controllers/admin/create-post/user/services/register/userDataProps';

@Controller('api/auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registerUser(@Body() userData: UserDataProps) {
    try {
      const result = await this.registerService.register(userData);

      return { message: 'usuário registrado com sucesso'! };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
