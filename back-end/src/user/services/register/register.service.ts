import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  register(userData) {
    console.log(userData);
  }
}
