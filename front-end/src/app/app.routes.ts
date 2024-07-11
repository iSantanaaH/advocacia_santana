import { Routes } from '@angular/router';
import { authGuard } from './services/user/auth/authGuard/auth.guard';
import LoginComponent from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'auth-user',
    loadComponent: () =>
      import('./layouts/auth-user-layout/auth-user-layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [authGuard],
        pathMatch: 'full',
      },
      {
        path: 'cadastro',
        loadComponent: () => import('./pages/register/register.component'),
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'page-not-found',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page-layout.component'),
  },
  {
    path: 'page-not-found',
    loadComponent: () => import('./pages/not-found/not-found.component'),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];
