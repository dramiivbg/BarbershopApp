import { Routes } from '@angular/router';
import { guardGuard } from './shared/guard/guard-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: 'home',
    loadChildren: () =>
      import('./private/private.routes').then((m) => m.routes),
      canActivate:[guardGuard]
  },
     
  {
    path: '',
    loadChildren: () =>
      import('./public/public.routes').then((m) => m.routes),
  },
];
