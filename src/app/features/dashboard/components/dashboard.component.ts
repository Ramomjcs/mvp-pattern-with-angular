import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../heroes/models/hero';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-ui',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  @Input() heroes: Hero[] | null = [];
  @Input() title: string = '';
}
