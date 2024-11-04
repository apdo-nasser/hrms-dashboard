import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onForgotPassword() {
    const email = this.forgotPasswordForm.get('email')?.value;
    if (this.forgotPasswordForm.valid) {
      if (isPlatformBrowser(this.platformId)) {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (parsedData.email === email) {
            delete parsedData.password; // Remove password
            localStorage.setItem('user', JSON.stringify(parsedData)); // Update storage
            alert('Password removed. You can now reset your password.');
            this.router.navigate(['/reset-password']); // Redirect to reset password
          } else {
            alert('Email does not match any records.');
          }
        } else {
          alert('No user data found.');
        }
      }
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
