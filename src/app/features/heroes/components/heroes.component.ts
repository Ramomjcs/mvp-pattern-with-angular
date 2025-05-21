import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../models/hero';
import { HeroesPresenter } from '../presenters/heroes.presenter';

@Component({
  selector: 'app-heroes-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HeroesPresenter],
})
export class HeroesComponent implements OnDestroy {
  @Input() heroes: Hero[] = [];
  @Input() title!: string;
  @Output() readonly add = new EventEmitter<string>();
  @Output() readonly remove = new EventEmitter<Hero>();

  readonly destroy$ = new Subject<void>();

  get nameControl(): FormControl {
    return this.presenter.nameControl;
  }

  constructor(private readonly presenter: HeroesPresenter) {
    this.presenter.add$
      .pipe(takeUntil(this.destroy$))
      .subscribe(name => this.add.emit(name));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addHero(): void {
    this.presenter.addHero();
  }
}
