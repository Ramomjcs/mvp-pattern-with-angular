import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';
import { DashboardComponent } from './dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  templateUrl: './dashboard.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainerComponent {
  private heroService = inject(HeroService);

  topHeroes$ = this.heroService.getHeroes().pipe(
    map((heroes: Hero[]) => heroes.slice(1, 5))
  );
}
