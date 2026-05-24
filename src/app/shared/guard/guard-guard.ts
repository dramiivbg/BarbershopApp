import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage/storageService';
import { APP_CONSTANTS } from 'src/app/core/constants/app.constants';
import { AuthService } from '../services/auth/auth-service';

export const guardGuard: CanActivateFn = async(route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isLogin = await authService.isLoggedIn();
  console.log(isLogin)

  if(!isLogin){
    router.navigate(['/login'], {replaceUrl: true});
    return false
  }

  return true;
};
