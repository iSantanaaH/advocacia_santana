import { UserFromToken } from 'src/models/public/user/user-from-token.model';

declare module 'express' {
  interface Request {
    user?: UserFromToken;
  }
}
