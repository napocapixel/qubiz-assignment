import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'explorer',
    loadComponent: () => import('./explorer/explorer.component'),
   },
   {
    path: 'details',
    loadComponent: () => import('./details/details.component'),
   },
   {
    path: '',
    redirectTo: 'explorer',
    pathMatch: 'full'
   }
];
