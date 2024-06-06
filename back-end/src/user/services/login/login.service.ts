/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async login(userData: LoginDataModel) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
        password: userData.password,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (user) {
      const token = this.generateToken(user.id);
      return { token, user };
    } else {
      throw new BadRequestException('Email ou senha inválidos');
    }
  }

  private generateToken(userId: number): string {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  }
}
