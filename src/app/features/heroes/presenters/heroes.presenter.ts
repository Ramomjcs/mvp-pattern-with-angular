import { Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesPresenter implements OnDestroy {
  private readonly add = new Subject<string>();
  readonly add$: Observable<string> = this.add.asObservable();
  readonly nameControl = new FormControl<string>('');

  ngOnDestroy(): void {
    this.add.complete();
  }

  addHero(): void {
    const name = this.nameControl.value?.trim() ?? '';
    this.nameControl.setValue('');

    if (!name) {
      return;
    }

    this.add.next(name);
  }
}
