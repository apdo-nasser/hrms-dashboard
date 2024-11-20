import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  standalone: true,
  imports: [ModalComponent, CommonModule, ReactiveFormsModule]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  showModal: boolean = false; // To control modal visibility
  modalMessage: string = ''; // The message to show in the modal
  modalType: 'success' | 'error' | 'info' = 'info'; // The type of message
  message: { type: string; title: string; text: string } | null = null; // To control alert visibility

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onResetPassword() {
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

    if (this.resetPasswordForm.valid) {
      if (newPassword === confirmPassword) {
        // Reset the password logic
        this.modalMessage = 'Password reset successfully!';
        this.modalType = 'success';
        this.showModal = true;

        // Set the alert message for feedback
        this.message = {
          type: 'success',
          title: 'Success',
          text: this.modalMessage
        };

        // Redirect to the login page after a short delay
        setTimeout(() => {
          this.showModal = false; // Close the modal before redirecting
          this.router.navigate(['/login']);
        }, 2000); // 2-second delay for user feedback
      } else {
        // Passwords don't match
        this.modalMessage = 'Passwords do not match.';
        this.modalType = 'error';
        this.showModal = true;

        // Set the alert message for feedback
        this.message = {
          type: 'danger',
          title: 'Error',
          text: this.modalMessage
        };
      }
    } else {
      // Form is invalid
      this.modalMessage = 'Please fill in all required fields.';
      this.modalType = 'error';
      this.showModal = true;

      // Set the alert message for feedback
      this.message = {
        type: 'danger',
        title: 'Error',
        text: this.modalMessage
      };
    }
  }

  closeModal() {
    this.showModal = false; // Close the modal
  }
}
