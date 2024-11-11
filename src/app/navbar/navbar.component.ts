import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]  // Ensure CommonModule is included here
})
export class NavbarComponent implements OnInit {
  userName: string = 'Guest';
  userIcon: string = 'assets/default.png';
  logoUrl: string = 'assets/default.png';
  userRole: string = 'guest';
  isLoggedIn: boolean = false;

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

      if (userData && userData.name && userData.role) {
        this.isLoggedIn = true;
        this.userName = userData.name;
        this.userRole = userData.role;
        this.setUserIconByRole(this.userRole);
        this.setLogoByRole(this.userRole);
      } else {
        this.isLoggedIn = false;
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

  onLogoClick() {
    if (this.isLoggedIn) {
      switch (this.userRole) {
        case 'admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'manager':
          this.router.navigate(['/manager-dashboard']);
          break;
        case 'employee':
          this.router.navigate(['/employee-dashboard']);
          break;
        default:
          this.router.navigate(['/']);
          break;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      this.userName = 'Guest';
      this.userRole = 'guest';
      this.userIcon = 'assets/default-icon.png';
      this.logoUrl = 'assets/default-logo.png';
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    }
  }
}
