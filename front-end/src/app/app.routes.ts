import { Routes } from '@angular/router';

import { ProfileComponent } from './components/user/profile/profile/profile.component';
import { authGuard } from './services/user/auth/authGuard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth-user',
    loadComponent: () =>
      import('./layouts/auth-user-layout/auth-user-layout.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component'),
        canActivate: [authGuard],
      },
      {
        path: 'cadastro',
        loadComponent: () => import('./pages/register/register.component'),
      },
      {
        path: '**',
        redirectTo: 'page-not-found',
      },
    ],
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/home-page-layout/home-page-layout.component'),
  },
  {
    path: 'page-not-found',
    loadComponent: () => import('./pages/not-found/not-found.component'),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];
