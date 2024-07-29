import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../../../app/services/tmdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ViewToggleComponent } from '../view-toggle/view-toggle.component';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MovieItemComponent, PaginationComponent, ViewToggleComponent]
})
export class NowPlayingComponent implements OnInit {
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
    this.route.queryParams.subscribe(params => {
      this.filters.genre = params['genre'] || '';
      this.filters.year = params['year'] || '';
      this.filters.country = params['country'] || '';
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.loadMovies();
      this.loadGenres();
      this.loadCountries();
    });
  }

  loadMovies() {
    this.tmdbService.getNowPlayingMovies(this.currentPage).subscribe((data: any) => {
      this.movies = data.results;
      this.totalPages = data.total_pages;
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
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
    this.currentPage = page;
    this.loadMovies();
  }
}
