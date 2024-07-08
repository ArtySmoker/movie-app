import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieListComponent } from './app/components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './app/components/movie-details/movie-details.component';
import { BrowserModule } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule),
    provideHttpClient(),
    provideRouter([
      { path: '', component: MovieListComponent },
      { path: 'movie/:id', component: MovieDetailsComponent }
    ])
  ]
}).catch(err => console.error(err));