import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const expectedRoles = route.data['roles'] as Array<string>;

    // Check if the user has a role and if it is in the expected roles
    if (user && user.role && expectedRoles.includes(user.role)) {
      return true;
    }

    // Redirect to 404 error page if not authorized
    this.router.navigate(['/404']);
    return false;
  }
}
