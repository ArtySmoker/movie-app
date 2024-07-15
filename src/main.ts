import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AuthGuard } from './app/guards/auth.guard';

import { MovieDetailsComponent } from './app/components/movie-details/movie-details.component';
import { MovieListComponent } from './app/components/movie-list/movie-list.component';
import { LoginComponent } from './app/components/login/login.component';
import { NowPlayingComponent } from './app/components/now-playing/now-playing.component';
import { PopularMoviesComponent } from './app/components/popular-movies/popular-movies.component';
import { TopRatedMoviesComponent } from './app/components/top-rated-movies/top-rated-movies.component';
import { UpcomingMoviesComponent } from './app/components/upcoming-movies/upcoming-movies.component';


import { TvPopularComponent } from './app/components/tv-popular/tv-popular.component';
import { TvTopRatedComponent } from './app/components/tv-top-rated/tv-top-rated.component';
import { TvAiringTodayComponent } from './app/components/tv-airing-today/tv-airing-today.component';
import { TvOnTheAirComponent } from './app/components/tv-on-the-air/tv-on-the-air.component';
import { TvAllComponent } from './app/components/tv-all/tv-all.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule, RouterModule),
    provideHttpClient(),
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: '#', pathMatch: 'full' },
      {
        path: '',
        
        canActivate: [AuthGuard],
        children: [
          { path: 'movies', component: MovieListComponent },
          { path: 'now-playing', component: NowPlayingComponent },
          { path: 'popular-movies', component: PopularMoviesComponent },
          { path: 'top-rated-movies', component: TopRatedMoviesComponent },
          { path: 'upcoming-movies', component: UpcomingMoviesComponent },
          { path: 'airing-today', component: TvAiringTodayComponent },
          { path: 'on-the-air', component: TvOnTheAirComponent },
          { path: 'popular-tv', component: TvPopularComponent },
          { path: 'top-rated-tv', component: TvTopRatedComponent },
          { path: 'all-tv-shows', component: TvAllComponent }
        ]
      },
      { path: 'movie/:id', component: MovieDetailsComponent }
    ])
  ]
}).catch(err => console.error(err));