import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../app/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink]
})
export class MovieListComponent  implements OnInit{
  movies: any[] = [];
  genres: any[] = [];
  countries: any[] = [];
  filters = {
    genre: '',
    year: '',
    country: ''
  };

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
    this.loadCountries();
  }

  loadMovies() {
    this.tmdbService.getMovies(this.filters).subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  loadGenres() {
    this.tmdbService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  loadCountries() {
    this.tmdbService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  onFilterChange() {
    this.loadMovies();
  }
}