import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasUser());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  // Check if user is stored in localStorage (only works in the browser)
  private hasUser(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('user');
    }
    return false;
  }

  login(user: any): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user', JSON.stringify(user));  // Save user data to localStorage
      this.isLoggedInSubject.next(true);  // Notify the application that the user is logged in
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Immediately redirect to the login page
      this.router.navigateByUrl('/login').then(() => {
        // After navigation, clear local storage and update the state
        localStorage.removeItem('user');
        this.isLoggedInSubject.next(false);
      });
    }
  }

  // Get user details (only works in the browser)
  getUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Get user role (only works in the browser)
  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // Check if user has a specific role (only works in the browser)
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();  // Return the current logged-in state
  }

  // Method to navigate user to their specific dashboard based on role
  redirectToDashboard(): void {
    const role = this.getUserRole();
    if (role === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (role === 'manager') {
      this.router.navigate(['/manager-dashboard']);
    } else if (role === 'employee') {
      this.router.navigate(['/employee-dashboard']);
    }
  }
}
