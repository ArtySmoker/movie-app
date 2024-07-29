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
  @Input() itemType: 'movie' | 'tv' = 'movie';

  constructor(private router: Router) {}

  onMovieClick() {
    if (this.movie && this.movie.id) {
      if (this.itemType === 'tv') {
        this.router.navigate(['/tv-show', this.movie.id]);
      } else {
        this.router.navigate(['/movie', this.movie.id]);
      }
    }
  }

  getYear(): string {
    if (this.itemType === 'tv') {
      return this.movie.first_air_date ? new Date(this.movie.first_air_date).getFullYear().toString() : '';
    } else {
      return this.movie.release_date ? new Date(this.movie.release_date).getFullYear().toString() : '';
    }
  }
}
