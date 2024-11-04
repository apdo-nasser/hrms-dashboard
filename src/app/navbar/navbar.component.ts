import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  userName: string = 'Guest';
  userIcon: string = 'assets/default-icon.png'; // Default guest icon
  logoUrl: string = 'assets/default-logo.png'; // Default logo for guests
  userRole: string = 'guest'; // Default role

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const userDataStr = localStorage.getItem('user') || '{}';
      const userData = JSON.parse(userDataStr);

      this.userName = userData.name || 'Guest';
      this.userRole = userData.role || 'guest';
      this.setUserIconByRole(this.userRole);
      this.setLogoByRole(this.userRole);
    }
  }

  setUserIconByRole(role: string) {
    switch (role) {
      case 'admin':
        this.userIcon = 'assets/admin-icon.png';
        break;
      case 'manager':
        this.userIcon = 'assets/manager-icon.png';
        break;
      case 'employee':
        this.userIcon = 'assets/employee-icon.png';
        break;
      default:
        this.userIcon = 'assets/default-icon.png';
        break;
    }
  }

  setLogoByRole(role: string) {
    switch (role) {
      case 'admin':
        this.logoUrl = 'assets/admin-logo.png';
        break;
      case 'manager':
        this.logoUrl = 'assets/manager-logo.png';
        break;
      case 'employee':
        this.logoUrl = 'assets/employee-logo.png';
        break;
      default:
        this.logoUrl = 'assets/default-logo.png';
        break;
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      // Clear user data from localStorage
      localStorage.removeItem('user');

      // Reset component properties to guest values
      this.userName = 'Guest';
      this.userRole = 'guest';
      this.userIcon = 'assets/default-icon.png';
      this.logoUrl = 'assets/default-logo.png';

      // Redirect to the home page
      this.router.navigate(['/']);
    }
  }
}
