import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../guards/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div>
      <input [(ngModel)]="apiKey" placeholder="Enter your TMDB API Key">
      <button (click)="login()">Login with TMDB</button>
      <p *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
  `
})
export class LoginComponent {
  apiKey: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    if (!this.apiKey) {
      this.errorMessage = 'Please enter your TMDB API Key';
      return;
    }
    this.authService.authenticate(this.apiKey).subscribe(
      () => {
        this.router.navigate(['/movies']);
      },
      (error: any) => {
        console.error('Authentication error', error);
        this.errorMessage = `Authentication failed: ${error}`;
      }
    );
  }
}
  