import { Routes } from '@angular/router';
import { adminGuard} from '../shared/guard/admin-guard/admin-guard';
import { clientGuard } from '../shared/guard/client-guard/client-guard';

export const routes: Routes = [
  
  
  {
    path: '',
    loadChildren: () => import('./client/client.routes').then( m => m.routes),
    canActivateChild: [clientGuard]
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then( m => m.routes),
    canActivateChild: [adminGuard]
  }
];