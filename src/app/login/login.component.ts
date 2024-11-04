import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID to check platform
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      // Check if we can access localStorage
      if (isPlatformBrowser(this.platformId)) {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

        // Validate user credentials
        if (storedUser.email === userData.email && storedUser.password === userData.password) {
          // Save user role in localStorage to use it in Navbar
          const userRole = storedUser.role || 'guest';  // Default to 'guest' if not found
          localStorage.setItem('user', JSON.stringify({ ...storedUser, role: userRole }));
          this.router.navigate([`/${userRole}-dashboard`]);  // Redirect based on user role
        } else {
          alert('Invalid credentials');
        }
      }
    }
  }
}
