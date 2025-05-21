import { Routes } from '@angular/router';
import { DashboardContainerComponent } from './features/dashboard/containers/dashboard.container';
import { HeroesContainerComponent } from './features/heroes/containers/heroes.container';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardContainerComponent },
  { path: 'heroes', component: HeroesContainerComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
