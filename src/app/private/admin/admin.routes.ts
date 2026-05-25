import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent, // El componente base que tiene el menú lateral
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage)
      }
      // Aquí añades más subpáginas del cliente que deban tener el menú
    ]
  }
];