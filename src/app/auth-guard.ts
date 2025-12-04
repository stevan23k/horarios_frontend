// auth.guard.ts (guard de ruta, no confundir con el backend)
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth-service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const canActivateAuth = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.perfil().pipe(
    map(response => {
      if (response.status === 200) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
