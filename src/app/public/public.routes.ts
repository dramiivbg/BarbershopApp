import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'type-user',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then((m) => m.LoginPage),
  },

    {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'type-user',
    loadComponent: () => import('./type-user/type-user.page').then( m => m.TypeUserPage)
  },  {
    path: 'login-barber',
    loadComponent: () => import('./login-barber/login-barber.page').then( m => m.LoginBarberPage)
  },


];