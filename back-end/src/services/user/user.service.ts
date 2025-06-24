import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });
import { PrismaService } from '../utils/prisma/prisma.service';
import { HashService } from '../utils/hash-service/hash-service';
import { LoginModel } from 'src/models/user/LoginModel';
import { CadastroModel } from 'src/models/user/CadastroModel';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  // Faz o cadastro do usuário;
  async register(userData: CadastroModel): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: userData.name }, { email: userData.email }],
      },
    });

    if (existingUser) {
      if (userData.name === existingUser.name) {
        throw new BadRequestException('Já existe um usuário com esse nome');
      } else if (userData.email === existingUser.email) {
        throw new BadRequestException('Esse email já está sendo usado');
      }
    }

    const hashPassword = await this.hashService.hashPassword(userData.password);

    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashPassword,
        birthdate: userData.birthdate,
        phone: userData.phone,
        roleId: 2,
        status: true,
      },
    });
    return user;
  }

  // Faz o login do usuário;
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
