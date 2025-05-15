/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/utils/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { HashService } from 'src/services/utils/hash-service/hash-service';
import { LoginModel } from 'src/models/user/LoginModel';
dotenv.config({ path: '../../../.env' });

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async login(userData: LoginModel) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
      select: {
        id: true,
        name: true,
        roleId: true,
        password: true,
      },
    });

    if (!user) {
      throw new BadRequestException('O usuário não existe!');
    }

    const isValidPassword = await this.hashService.comparePassword(
      userData.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Senha inválida!');
    }

    const token = this.generateToken(user);
    return { token };
  }

  private generateToken(user: {
    id: number;
    name: string;
    roleId: number;
  }): string {
    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  }
}
