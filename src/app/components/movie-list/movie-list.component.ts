import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../app/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ViewToggleComponent } from '../view-toggle/view-toggle.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MovieItemComponent, PaginationComponent, ViewToggleComponent]
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  countries: any[] = [];
  filters = {
    genre: '',
    year: '',
    country: ''
  };
  viewMode: 'grid' | 'list' = 'grid';
  currentPage = 1;
  totalPages = 1;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
    this.loadCountries();
  }

  loadMovies() {
    this.tmdbService.getMovies(this.filters, this.currentPage).subscribe((data: any) => {
      this.movies = data.results;
      this.totalPages = data.total_pages;
      console.log('Loaded movies:', this.movies);
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
    this.currentPage = 1;
    this.loadMovies();
  }

  onViewChange(view: 'grid' | 'list') {
    this.viewMode = view;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadMovies();
  }
}