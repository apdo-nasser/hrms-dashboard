import { Component, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  coverEyes: boolean = false; // Controls the hand visibility
  @Output() loginStatus = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPasswordFocus(isFocused: boolean) {
    this.coverEyes = isFocused;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      if (isPlatformBrowser(this.platformId)) {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        const user = storedUsers.find(
          (u: any) => u.email === userData.email && u.password === userData.password
        );

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          const userRole = user.role || 'guest';
          this.router.navigate([`/${userRole}-dashboard`]);
          this.loginStatus.emit(true); // Notify AppComponent of successful login
        } else {
          alert('Invalid credentials');
        }
      }
    }
  }
}
