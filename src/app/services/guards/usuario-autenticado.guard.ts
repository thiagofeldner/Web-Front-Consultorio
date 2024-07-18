import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticarService } from '../autenticar/autenticar.service';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  return inject(AutenticarService).isAutenticado ? true : inject(Router).createUrlTree(['/login']);
};
