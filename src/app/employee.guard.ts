import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    
    if (userRole === 'employee' || userRole === 'manager' || userRole === 'admin') {
      return true;
    }

    // Redirect to unauthorized if not an employee, manager, or admin
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
