import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageLayoutComponent } from './layouts/home-page-layout/home-page-layout.component';
import { AuthUserLayoutComponent } from './layouts/auth-user-layout/auth-user-layout.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: 'auth-user',
    component: AuthUserLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
      },
      {
        path: 'cadastro',
        component: RegisterComponent,
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
    component: HomePageLayoutComponent,
    pathMatch: 'full',
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];
