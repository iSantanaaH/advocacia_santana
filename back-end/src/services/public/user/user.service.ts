import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../../.env' });
import { PrismaService } from '../../utils/prisma/prisma.service';
import { HashService } from '../../utils/hash-service/hash-service';
import { AuthUserResquest } from 'src/models/public/user/sign-in-user-request.model';
import { SignUpUserRequest } from 'src/models/public/user/sign-up-user-request.model';
import { User } from '@prisma/client';
import { UserTokenPayload } from 'src/models/public/user/user-token-payload.model';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  // Faz o cadastro do usuário;
  async signUp(signUpUserData: SignUpUserRequest): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: signUpUserData.name }, { email: signUpUserData.email }],
      },
    });

    if (existingUser) {
      if (signUpUserData.name === existingUser.name) {
        throw new BadRequestException('Já existe um usuário com esse nome');
      } else if (signUpUserData.email === existingUser.email) {
        throw new BadRequestException('Esse email já está sendo usado');
      }
    }

    const hashPassword = await this.hashService.hashPassword(
      signUpUserData.password,
    );

    const user = await this.prisma.user.create({
      data: {
        name: signUpUserData.name,
        email: signUpUserData.email,
        password: hashPassword,
        birthdate: signUpUserData.birthdate,
        phone: signUpUserData.phone,
        roleId: 2,
        status: true,
      },
    });
    return user;
  }

  // Faz o login do usuário;
  async signIn(authUserData: AuthUserResquest) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authUserData.email,
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
      authUserData.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Senha inválida!');
    }

    const { id, name, roleId } = user;
    const token = this.generateToken({ id, name, roleId });
    return { token };
  }

  private generateToken(user: UserTokenPayload): string {
    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    return token;
  }
}
