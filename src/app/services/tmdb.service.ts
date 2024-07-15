import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getMovies(filters: any, page: number = 1) {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString());

    if (filters.genre) {
      params = params.set('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.set('primary_release_year', filters.year);
    }
    if (filters.country) {
      params = params.set('with_origin_country', filters.country);
    }

    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

  getMovieDetails(movieId: number) {
    return this.http.get(`${this.apiUrl}/movie/${movieId}`, {
      params: { api_key: this.apiKey }
    });
  }

  getGenres() {
    return this.http.get(`${this.apiUrl}/genre/movie/list`, {
      params: { api_key: this.apiKey }
    });
  }

  getCountries() {
    return this.http.get(`${this.apiUrl}/configuration/countries`, {
      params: { api_key: this.apiKey }
    });
  }

  getMovieCredits(movieId: number) {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/credits`, {
      params: { api_key: this.apiKey }
    });
  }

  getMovieTranslations(movieId: number) {
    return this.http.get(`${this.apiUrl}/movie/${movieId}/translations`, {
      params: { api_key: this.apiKey }
    });
  }
}
