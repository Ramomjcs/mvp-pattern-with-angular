import { Routes } from '@angular/router';
import { DashboardContainerComponent } from './components/dashboard/dashboard.container';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardContainerComponent },
//   { path: 'heroes', component: HeroesComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // rota padrão
];
