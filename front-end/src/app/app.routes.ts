import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomePageLayoutComponent } from './layouts/home-page-layout/home-page-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
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
