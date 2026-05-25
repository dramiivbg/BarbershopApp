import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';

export const routes: Routes = [
  {
    path: '',
    component: ClientComponent, // El componente base que tiene el menú lateral
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