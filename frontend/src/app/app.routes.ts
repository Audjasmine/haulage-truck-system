// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Trucks } from './pages/trucks/trucks';
import { Drivers } from './pages/drivers/drivers';
import { Jobs } from './pages/jobs/jobs';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'trucks', component: Trucks, canActivate: [authGuard] },
  { path: 'drivers', component: Drivers, canActivate: [authGuard] },
  { path: 'jobs', component: Jobs, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
