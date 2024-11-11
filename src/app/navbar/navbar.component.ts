import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]  // Import CommonModule for *ngIf
})
export class NavbarComponent implements OnInit {
  userName: string = 'Guest';
  userIcon: string = 'assets/default.png';
  logoUrl: string = 'assets/default.png';
  userRole: string = 'guest';
  isLoggedIn: boolean = false;  // Track login state

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

      if (userData && userData.name) {
        this.isLoggedIn = true;  // User is logged in
        this.userName = userData.name;
        this.userRole = userData.role;
        this.setUserIconByRole(this.userRole);
        this.setLogoByRole(this.userRole);
      } else {
        this.isLoggedIn = false;  // User is not logged in
      }
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
      // Clear only the current user data
      localStorage.removeItem('user');

      // Reset to guest values
      this.userName = 'Guest';
      this.userRole = 'guest';
      this.userIcon = 'assets/default-icon.png';
      this.logoUrl = 'assets/default-logo.png';

      // Set login state to false
      this.isLoggedIn = false;

      // Redirect to the home page or login page
      this.router.navigate(['/login']);
    }
  }
}
