import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, 
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>Movie App</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'movie-app';
}
