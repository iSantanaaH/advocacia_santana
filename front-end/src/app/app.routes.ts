import { Routes } from '@angular/router';
import { authGuard } from './services/user/auth/authGuard/auth.guard';
import LoginComponent from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page-layout.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/register/register.component'),
    pathMatch: 'full',
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
