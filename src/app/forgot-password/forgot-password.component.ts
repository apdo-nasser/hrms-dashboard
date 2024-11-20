import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ModalComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  showModal: boolean = false;  // To control modal visibility
  modalMessage: string = '';  // The message to show in the modal
  modalType: 'success' | 'error' | 'info' = 'info';  // The type of message

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
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  
        const user = storedUsers.find((u: any) => u.email === email);
        if (user) {
          // Store the email temporarily for password reset process
          localStorage.setItem('resetUserEmail', email);

          // Show success modal with reset password message
          this.modalMessage = 'Password reset link sent. Please check your email to proceed with resetting your password.';
          this.modalType = 'success';
          this.showModal = true;

          // Redirect to reset password page after a short delay
          setTimeout(() => {
            this.router.navigate(['/reset-password']);
          }, 2000);
        } else {
          // Show error modal if no user found
          this.modalMessage = 'No user found with this email.';
          this.modalType = 'error';
          this.showModal = true;
        }
      }
    }
  }

  closeModal() {
    this.showModal = false;  // Close the modal
  }
}
