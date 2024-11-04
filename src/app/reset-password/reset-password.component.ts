import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onResetPassword() {
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

    if (this.resetPasswordForm.valid) {
      if (newPassword === confirmPassword) {
        if (isPlatformBrowser(this.platformId)) {
          const userData = localStorage.getItem('user');
          if (userData) {
            const parsedData = JSON.parse(userData);
            parsedData.password = newPassword; // Set new password
            localStorage.setItem('user', JSON.stringify(parsedData)); // Update storage
            alert('Password reset successfully!');
            this.router.navigate(['/login']); // Redirect to login page
          } else {
            alert('No user data found.');
          }
        }
      } else {
        alert('Passwords do not match.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
