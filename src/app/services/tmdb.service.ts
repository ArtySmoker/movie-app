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

  getNowPlayingMovies(filters: any = {}, page: number = 1): Observable<any> {
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString())
      .set('sort_by', 'release_date.desc')
      .set('release_date.gte', lastMonth.toISOString().split('T')[0])
      .set('release_date.lte', currentDate.toISOString().split('T')[0])
      .set('with_release_type', '2|3');
      
  
    if (filters.genre) {
      params = params.append('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.append('primary_release_year', filters.year);
    }
    if (filters.country) {
      params = params.append('with_origin_country', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

  getPopularMovies(filters: any = {}, page: number = 1): Observable<any> {
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

  

  getTopRatedMovies(filters: any = {}, page: number = 1) {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString())
      .set('sort_by', 'vote_average.desc')  
      .set('vote_count.gte', '1000');
  
    if (filters.genre) {
      params = params.append('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.append('primary_release_year', filters.year);
    }
    if (filters.country) {
      params = params.append('with_origin_country', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

  getUpcomingMovies(filters: any = {}, page: number = 1): Observable<any> {
    const currentDate = new Date();
    const nextMonth = new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString())
      .set('sort_by', 'release_date.asc')
      .set('release_date.gte', currentDate.toISOString().split('T')[0])
      .set('release_date.lte', nextMonth.toISOString().split('T')[0])
      .set('with_release_type', '2|3');
  
    if (filters.genre) {
      params = params.append('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.append('primary_release_year', filters.year);
    }
    if (filters.country) {
      params = params.append('with_origin_country', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }

  getTvAiringToday(filters: any = {}, page: number = 1): Observable<any> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString())
      .set('air_date.gte', today.toISOString().split('T')[0])
      .set('air_date.lte', tomorrow.toISOString().split('T')[0]);
  
    if (filters.genre) {
      params = params.append('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.append('first_air_date_year', filters.year);
    }
    if (filters.country) {
      params = params.append('with_origin_country', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/discover/tv`, { params });
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
  
  getTvOnTheAir(filters: any = {}, page: number = 1): Observable<any> {
    const currentDate = new Date();
    const nextWeek = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString())
      .set('sort_by', 'first_air_date.asc')
      .set('air_date.gte', currentDate.toISOString().split('T')[0])
      .set('air_date.lte', nextWeek.toISOString().split('T')[0]);
      
  
    if (filters.genre) {
      params = params.append('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.append('first_air_date_year', filters.year);
    }
    if (filters.country) {
      params = params.append('with_origin_country', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/discover/tv`, { params });
  }
  

  getTopRatedTvShows(filters: any = {}, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page.toString())
      .set('sort_by', 'vote_average.desc')
      .set('vote_count.gte', '100');
      
  
    if (filters.genre) {
      params = params.append('with_genres', filters.genre);
    }
    if (filters.year) {
      params = params.append('first_air_date_year', filters.year);
    }
    if (filters.country) {
      params = params.append('with_origin_country', filters.country);
    }
  
    return this.http.get(`${this.apiUrl}/discover/tv`, { params });
  }

  getPopularTvShows(filters: any = {}, page: number = 1): Observable<any> { 
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
    return this.http.get(`${this.apiUrl}/discover/tv`,{ params });
   
  }
}
