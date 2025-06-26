import { Routes } from '@angular/router';

export default [
  {
    path: 'login',
    loadComponent: () => import('./login/login'),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register'),
  },
] as Routes;
