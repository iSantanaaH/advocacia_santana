import { Routes } from '@angular/router';
import { authGuard } from './guards/authGuard/auth.guard';
import { createPostGuard } from './guards/createPostGuard/create-post.guard';

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
    path: 'admin/createPost',
    loadComponent: () => import('./pages/postCreator/post-creator.component'),
    pathMatch: 'full',
    canActivate: [createPostGuard],
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
