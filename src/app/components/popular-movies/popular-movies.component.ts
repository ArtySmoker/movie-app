import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../app/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ViewToggleComponent } from '../view-toggle/view-toggle.component';

@Component({
  selector: 'app-popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MovieItemComponent, PaginationComponent, ViewToggleComponent]
})
export class PopularMoviesComponent implements OnInit {
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

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log('PopularMoviesComponent initialized');
    this.route.queryParams.subscribe(params => {
      console.log('Route params:', params);
      this.filters.genre = params['genre'] || '';
      this.filters.year = params['year'] || '';
      this.filters.country = params['country'] || '';
      this.currentPage = params['page'] ? +params['page'] : 1;
      console.log('Filters after parsing params:', this.filters);
      this.loadMovies();
      this.loadGenres();
      this.loadCountries();
    });
  }

  loadMovies() {
    console.log('Loading movies with filters:', this.filters);
    this.tmdbService.getPopularMovies(this.currentPage, this.filters).subscribe(
      (data: any) => {
        console.log('Movies data received:', data);
        this.movies = data.results;
        this.totalPages = data.total_pages;
        if (this.movies.length === 0) {
          console.log('No movies returned from the API');
        } else {
          console.log(`Received ${this.movies.length} movies`);
        }
      },
      error => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  loadGenres() {
    this.tmdbService.getGenres().subscribe((data: any) => {
      console.log('Genres loaded:', data);
      this.genres = data.genres;
    });
  }

  loadCountries() {
    this.tmdbService.getCountries().subscribe((data: any) => {
      console.log('Countries loaded:', data);
      this.countries = data;
    });
  }

  onFilterChange() {
    console.log('Filter changed:', this.filters);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        genre: this.filters.genre,
        year: this.filters.year,
        country: this.filters.country,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
    this.currentPage = 1;
    this.loadMovies();
  }

  onViewChange(view: 'grid' | 'list') {
    this.viewMode = view;
  }

  onPageChange(page: number) {
    console.log('Page changed:', page);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
    this.currentPage = page;
    this.loadMovies();
  }
}