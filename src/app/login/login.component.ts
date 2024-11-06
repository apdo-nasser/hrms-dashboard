import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Import RouterModule here
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]  // Add RouterModule to imports
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  coverEyes: boolean = false; // Controls the hand visibility

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordFocus(isFocused: boolean) {
    this.coverEyes = isFocused; // Show hand when focused
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      if (isPlatformBrowser(this.platformId)) {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Find the user that matches the email and password
        const user = storedUsers.find((u: any) => u.email === userData.email && u.password === userData.password);
        
        if (user) {
          // Set the current session user in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          
          // Navigate to the user's dashboard based on their role
          const userRole = user.role || 'guest'; // Default to 'guest' if no role is set
          this.router.navigate([`/${userRole}-dashboard`]);
        } else {
          alert('Invalid credentials');
        }
      }
    }
  }
}
