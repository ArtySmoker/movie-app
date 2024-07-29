import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TmdbService } from '../../services/tmdb.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ViewToggleComponent } from '../view-toggle/view-toggle.component';

@Component({
  selector: 'app-tv-on-the-air',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MovieItemComponent, PaginationComponent, ViewToggleComponent],
  templateUrl: './tv-on-the-air.component.html',
  styleUrls: ['./tv-on-the-air.component.css']
})
export class TvOnTheAirComponent implements OnInit {
  shows: any[] = [];
  genres: any[] = [];
  countries: any[] = [];
  filters = {
    genre: '',
    year: '',
    country: ''
  };
  currentPage = 1;
  totalPages = 1;
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters.genre = params['genre'] || '';
      this.filters.year = params['year'] || '';
      this.filters.country = params['country'] || '';
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.loadTvOnTheAir();
      this.loadGenres();
      this.loadCountries();
    });
  }

  loadTvOnTheAir(page: number = 1): void {
    this.tmdbService.getTvOnTheAir(page, this.filters).subscribe((data: any) => {
      this.shows = data.results;
      this.totalPages = data.total_pages;
      this.currentPage = page;
    });
  }

  loadGenres() {
    this.tmdbService.getTvGenres().subscribe((data: any) => {
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
    this.loadTvOnTheAir();
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
    this.loadTvOnTheAir(page);
  }
}
