import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageLayoutComponent } from './layouts/home-page-layout/home-page-layout.component';
import { AuthUserLayoutComponent } from './layouts/auth-user-layout/auth-user-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './components/user/profile/profile/profile.component';
import { authGuard } from './services/user/auth/authGuard/auth.guard';

export const routes: Routes = [
  {
    path: 'auth-user',
    component: AuthUserLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [authGuard],
      },
      {
        path: 'cadastro',
        component: RegisterComponent,
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
    component: HomePageLayoutComponent,
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];
