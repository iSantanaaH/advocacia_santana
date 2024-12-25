import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/utils/prisma/prisma.service';
import { UserDataProps } from './userDataProps';
import { User } from '@prisma/client';
import { HashService } from 'src/services/utils/hash-service/hash-service';

@Injectable()
export class RegisterService {
  constructor(
    private prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

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
}
