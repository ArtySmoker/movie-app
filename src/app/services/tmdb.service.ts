import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  getTvShows(filters: any, page: number = 1) {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString());

    if (filters.genre) {
      params = params.set('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.set('first_air_date_year', filters.year);
    }
    if (filters.country) {
      params = params.set('with_origin_country', filters.country);
    }

    return this.http.get(`${this.apiUrl}/discover/tv`, { params });
  }

  getTvGenres() {
    return this.http.get(`${this.apiUrl}/genre/tv/list`, {
      params: { api_key: this.apiKey }
    });
  }

  getNowPlayingMovies(page: number = 1) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString());
    
    return this.http.get(`${this.apiUrl}/movie/now_playing`, { params });
  }

  getPopularMovies(page: number, filters: any): Observable<any> {
    console.log('getPopularMovies called with filters:', filters);
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
  
    console.log('API request URL:', `${this.apiUrl}/movie/popular`);
    console.log('API request params:', params.toString());

    return this.http.get(`${this.apiUrl}/movie/popular`, { params }).pipe(
      tap(
        data => console.log('API response:', data),
        error => console.error('API error:', error)
      )
    );
  }
  

  getTopRatedMovies(page: number = 1) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString());

    return this.http.get(`${this.apiUrl}/movie/top_rated`, { params });
  }

  getUpcomingMovies(page: number = 1) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString());

    return this.http.get(`${this.apiUrl}/movie/upcoming`, { params });
  }

  getTvAiringToday(filters: any, page: number) {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString());
  
    if (filters.genre) {
      params = params.set('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.set('first_air_date_year', filters.year);
    }
    if (filters.country) {
      params = params.set('with_origin_country', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/tv/airing_today`, { params });
  }

  getTvShowDetails(id: number) {
    return this.http.get(`${this.apiUrl}/tv/${id}?api_key=${this.apiKey}`);
  }

  getTvShowCredits(id: number) {
    return this.http.get(`${this.apiUrl}/tv/${id}/credits?api_key=${this.apiKey}`);
  }

  getTvShowTranslations(id: number) {
    return this.http.get(`${this.apiUrl}/tv/${id}/translations?api_key=${this.apiKey}`);
  }
  
  getTvOnTheAir(page: number = 1, filters: any = {}): Observable<any> {
    let params = new HttpParams().set('api_key', this.apiKey).set('page', page.toString());
  
    if (filters.genre) {
      params = params.set('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.set('first_air_date_year', filters.year);
    }
    if (filters.country) {
      params = params.set('region', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/tv/on_the_air`, { params });
  }
  

  getTopRatedTvShows(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tv/top_rated?api_key=${this.apiKey}`);
  }

  getPopularTvShows(): Observable<any> {  
    return this.http.get(`${this.apiUrl}/tv/popular?api_key=${this.apiKey}`);
  }
}
