import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.authService.getUser();

    if (user) {
      const requiredRole = route.data['role'] as string;
      const userRole = this.authService.getUserRole();

      // Allow access if no specific role is required or user has the required role
      if (!requiredRole || userRole === requiredRole || 
          (userRole === 'admin' && (requiredRole === 'manager' || requiredRole === 'employee')) || 
          (userRole === 'manager' && requiredRole === 'employee')) {
        return true;
      }

      // Redirect to unauthorized page if the user does not have the required role
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // Redirect to login if user is not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}
