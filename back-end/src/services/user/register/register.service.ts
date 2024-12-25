import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/utils/prisma/prisma.service';
import { UserDataProps } from './userDataProps';
import { User } from '@prisma/client';

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}

  async register(userData: UserDataProps): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: userData.name }, { email: userData.email }],
      },
    });

    if (existingUser) {
      if (userData.name === existingUser.name) {
        throw new BadRequestException('Já existe um usuário com esse nome');
      } else if (userData.email === existingUser.email) {
        throw new BadRequestException('Esse emai já está sendo usado');
      }
    }

    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        birthdate: userData.birthdate,
        phone: userData.phone,
        roleId: 2,
        status: true,
      },
    });
    return user;
  }
}
