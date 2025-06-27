import { Route, Routes } from '@angular/router';

export default [
  {
    path: 'home',
    loadComponent: () => import('./list/list'),
  },
  {
    path: 'home/new',
    loadComponent: () => import('./form/form'),
  },
] as unknown as Routes;
