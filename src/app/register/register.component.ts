import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]  // Ensure CommonModule and ReactiveFormsModule are imported here
})
export class RegisterComponent {
  registerForm: FormGroup;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object  // Inject PLATFORM_ID to check platform
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],           // Added company field
      role: ['', Validators.required],               // Ensure role is part of the registration form
      numEmployees: ['', Validators.required],       // Added number of employees field
      industry: ['', Validators.required],           // Added industry field
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  // This method advances to the next step in the form
  nextStep() {
    this.step++;
  }

  // This method submits the form and navigates to home on success
  onSubmit() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;

      // Only access localStorage if we are in a browser environment
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('user', JSON.stringify(userData));
      }

      this.router.navigate(['/home']);  // Redirect to the home page after registration
      alert('Registration successful!'); // Feedback on successful registration
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
