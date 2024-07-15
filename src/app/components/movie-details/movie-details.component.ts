import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any = null;
  credits: any = null;
  translations: any = null;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovieDetails(+id);
    }
  }

  loadMovieDetails(id: number) {
    forkJoin({
      movieDetails: this.tmdbService.getMovieDetails(id),
      credits: this.tmdbService.getMovieCredits(id),
      translations: this.tmdbService.getMovieTranslations(id)
    }).subscribe({
      next: (data: any) => {
        this.movie = data.movieDetails;
        this.credits = data.credits;
        this.translations = data.translations;
        console.log('Movie details loaded:', this.movie);
      },
      error: (error) => {
        console.error('Error fetching movie details:', error);
      }
    });
  }
}