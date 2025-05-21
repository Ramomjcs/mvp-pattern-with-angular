import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';
import { HeroesComponent } from '../components/heroes.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [HeroesComponent, CommonModule],
})
export class HeroesContainerComponent {
  private heroesSubject = new BehaviorSubject<Hero[]>([]);
    heroes$ = this.heroesSubject.asObservable().pipe(
      filter((heroes): heroes is Hero[] => heroes !== null && heroes !== undefined)
    );

  constructor(private readonly heroService: HeroService) {
    this.loadHeroes();
  }

  private loadHeroes() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroesSubject.next(heroes));
  }

  add(name: string): void {
    this.heroService.addHero({ name } as Hero)
      .subscribe({
        next: hero => {
          const current = this.heroesSubject.value;
          this.heroesSubject.next([...current, hero]);
        },
        error: () => {},
      });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
      .subscribe({
        next: () => {
          const current = this.heroesSubject.value;
          this.heroesSubject.next(current.filter(h => h.id !== hero.id));
        },
        error: (e) => {
          console.error('Error deleting hero:', e);
        },
      });
  }
}
