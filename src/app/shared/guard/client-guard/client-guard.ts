import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';

export const clientGuard: CanActivateFn = async (route, state) => {
  const authService  = inject(AuthService);
  const router = inject(Router);
  const token:string = await authService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // 2. Decodificar el token para leer los Claims de .NET Core
    const decodedToken: any = authService.decodeToken(token);
    
    // URL del Claim de Rol estándar que genera tu API de .NET
    const roleClaimKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const userRole = decodedToken[roleClaimKey];

    console.log(decodedToken, token)

    // 3. Validar si el rol es exactamente el requerido
    if (userRole != 'client') { 
      return false;
    }

    return true;

  } catch (error) {
    // Si el token está corrupto o mal formado
    router.navigate(['/login']);
    await authService.logout();
    return false;
  }
};
