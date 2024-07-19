import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AutenticarService } from '../autenticar/autenticar.service';

export const usuarioAutenticadoGuard: CanActivateChildFn = (route, state) => {
  return inject(AutenticarService).isAutenticado ? true : inject(Router).createUrlTree(['/login']);
};
