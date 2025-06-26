import { Route, Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./list/list'),
  },
  {
    path: 'new',
    loadComponent: () => import('./form/form'),
  },
  {
    path: 'edit/:idTask',
    loadComponent: () => import('./form/form'),
  },
] as unknown as Routes;
