import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    canActivate: [publicGuard],
    canActivateChild: [publicGuard],
    path: 'auth',
    loadChildren: () => import('./auth/features/auth.routes'),
  },
  {
    canActivate: [privateGuard],
    canActivateChild: [privateGuard],
    path: 'home',
    loadComponent: () => import('./shared/ui/layout.component'),
    loadChildren: () => import('./dashboard/features/dashboard.routes'),
  },
  { path: '**', redirectTo: '/home' },
];
