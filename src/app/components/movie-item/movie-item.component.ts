import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
  @Input() movie: any;
  @Input() viewMode: 'list' | 'grid' = 'grid';

  constructor(private router: Router) {}

  onMovieClick() {
    if (this.movie && this.movie.id) {
      this.router.navigate(['/movie', this.movie.id]);
    }
  }
}