import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  authenticate(apiKey: string) {
    console.log('Attempting to authenticate with API key:', apiKey);
    return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`).pipe(
      map(response => {
        console.log('Authentication response:', response);
        localStorage.setItem('currentUser', JSON.stringify({ authenticated: true, apiKey: apiKey }));
        this.currentUserSubject.next({ authenticated: true, apiKey: apiKey });
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const currentUser = this.currentUserValue;
    return !!(currentUser && currentUser.authenticated);
  }

  getApiKey(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.apiKey : null;
  }
}
