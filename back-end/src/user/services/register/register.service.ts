import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UserDataProps } from './userDataProps';
import { User } from '@prisma/client';

@Injectable()
export class RegisterService {
  constructor(private prisma: PrismaService) {}

  async register(userData: UserDataProps): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        birthdate: userData.birthdate,
        phone: userData.phone,
        status: true,
        roleId: 2,
      },
    });
    return user;
  }
}
