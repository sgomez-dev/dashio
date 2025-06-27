import { inject } from '@angular/core';
import {
  CanActivateChild,
  CanActivateChildFn,
  CanActivateFn,
  Router,
} from '@angular/router';
import { authState } from '@angular/fire/auth';
import { AuthStateService } from '../shared/data-access/auth-state.service';
import { filter, map, take } from 'rxjs';

export const privateGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return authState.authState$.pipe(
    filter((user) => user !== undefined),
    take(1),
    map((user) => {
      if (!user) {
        return router.createUrlTree(['/auth/login']);
      }
      return true;
    })
  );
};

export const publicGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return authState.authState$.pipe(
    filter((user) => user !== undefined),
    take(1),
    map((user) => {
      if (user) {
        return router.createUrlTree(['/home']);
      }
      return true;
    })
  );
};
