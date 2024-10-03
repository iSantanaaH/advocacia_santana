import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/user/auth/authService/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const UserRoleId = authService.getUserRole();

  if (UserRoleId != 1) {
    router.navigate(['']);
    return false;
  }

  return true;
};
