import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class NavbarComponent implements OnInit {
  userName: string = 'Guest';
  userIcon: string = 'assets/default.png';
  logoUrl: string = 'assets/default-logo.png';
  userRole: string = 'guest';
  isLoggedIn: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadUserData();

    // Subscribe to login status updates
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadUserData();
      } else {
        this.resetToGuest();
      }
      this.cdr.detectChanges(); // Trigger immediate UI update
    });
  }

  loadUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const userDataStr = localStorage.getItem('user') || '{}';
      const userData = JSON.parse(userDataStr);
  
      if (userData && userData.name && userData.role) {
        this.userName = userData.name;
        this.userRole = userData.role;
        this.isLoggedIn = true; 
        this.setUserIconByRole(this.userRole);
        this.setLogoByRole(this.userRole);
      } else {
        this.resetToGuest();
      }
    }
  }

  setUserIconByRole(role: string) {
    this.userIcon = `assets/${role}-icon.png` || 'assets/default-icon.png';
  }

  setLogoByRole(role: string) {
    this.logoUrl = `assets/${role}-logo.png` || 'assets/default-logo.png';
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.logout();

      // Use NgZone to ensure changes are detected immediately after the navigation
      this.ngZone.run(() => {
        this.resetToGuest();
        this.router.navigate(['/login']).then(() => {
          this.cdr.detectChanges(); // Force UI update immediately
        });
      });
    }
  }

  resetToGuest() {
    this.userName = 'Guest';
    this.userRole = 'guest';
    this.userIcon = 'assets/default-icon.png';
    this.logoUrl = 'assets/default-logo.png';
    this.isLoggedIn = false;
  }
}
