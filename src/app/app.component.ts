import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';  // Correct import for isPlatformBrowser
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgZone } from '@angular/core';  // Correct import for NgZone
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
})
export class AppComponent implements OnInit {
  title = 'hrms-dashboard';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone  // Correct injection
  ) {}

  ngOnInit() {
    // Subscribe to login state from AuthService
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.ngZone.run(() => {}); // Ensure Angular triggers change detection
    });

    // Check if it's a browser environment before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      this.isLoggedIn = !!user;
    }
  }

  // Function to update login status
  updateLoginStatus(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
