import { Routes } from '@angular/router';
import { authGuard } from './guards/authGuard/auth.guard';
import { roleGuard } from './guards/roleGuard/role.guard';

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
    loadComponent: () =>
      import('./pages/admin/post-creator/post-creator.component'),
    pathMatch: 'full',
    canActivate: [roleGuard],
  },
  {
    path: 'admin/manage-post',
    loadComponent: () =>
      import('./pages/admin/manage-post/manage-post.component'),
    children: [
      {
        path: 'published',
        loadComponent: () =>
          import('./pages/admin/published/published.component').then(
            (c) => c.PublishedComponent
          ),
      },
      {
        path: 'unpublished',
        loadComponent: () =>
          import('./pages/admin/unpublished/unpublished.component').then(
            (c) => c.UnpublishedComponent
          ),
      },
    ],
    canActivate: [roleGuard],
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
