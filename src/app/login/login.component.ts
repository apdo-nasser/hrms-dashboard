import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../auth.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ModalComponent],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  showModal: boolean = false;  // To control modal visibility
  modalMessage: string = '';  // The message to show in the modal
  modalType: 'success' | 'error' | 'info' = 'info';  // The type of message
  
  // Add a message property to hold feedback data
  message: { type: string; title: string; text: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
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

  onPasswordFocus(isFocused: boolean) {}

  onSubmit() {
    if (this.loginForm.valid && isPlatformBrowser(this.platformId)) {
      const userData = this.loginForm.value;
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = storedUsers.find((u: any) => {
        const emailMatches = u.email.trim().toLowerCase() === userData.email.trim().toLowerCase();
        const passwordMatches = u.password === userData.password;
        return emailMatches && passwordMatches;
      });

      if (user) {
        this.authService.login(user);
        const userRole = user.role || 'guest';
        this.router.navigate([`/${userRole}-dashboard`]);
      } else {
        this.modalMessage = 'Invalid credentials. Please check your email and password.';
        this.modalType = 'error';
        this.showModal = true;

        // Set the message property for the feedback
        this.message = {
          type: 'danger',
          title: 'Error',
          text: this.modalMessage
        };
      }
    }
  }

  closeModal() {
    this.showModal = false;  // Close the modal
  }
}
