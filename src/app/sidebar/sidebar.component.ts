import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  isAdmin: boolean = false;
  isManager: boolean = false;
  isEmployee: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone // Inject NgZone
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      this.updateUserRole();
      this.cdr.detectChanges(); // Trigger immediate UI update
    });
  }

  updateUserRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const role = user?.role || 'guest';

    this.isAdmin = role === 'admin';
    this.isManager = role === 'manager';
    this.isEmployee = role === 'employee';
  }

  logout() {
    this.authService.logout();

    // Use NgZone to ensure changes are detected immediately after the navigation
    this.ngZone.run(() => {
      this.router.navigate(['/login']).then(() => {
        this.cdr.detectChanges(); // Force UI update immediately
      });
    });
  }
}
