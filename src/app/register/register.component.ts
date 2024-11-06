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
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      role: ['', Validators.required],
      numEmployees: ['', Validators.required],
      industry: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  nextStep() {
    this.step++;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        registeredAt: new Date().toISOString() // Add registration date
      };

      if (isPlatformBrowser(this.platformId)) {
        // Retrieve existing registered users from localStorage or initialize as empty array
        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

        // Add the new user data to the registered users array
        users.push(userData);

        // Save the updated users array to localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(users));

        // Set the current session user data
        localStorage.setItem('user', JSON.stringify(userData));
      }

      this.router.navigate(['/login']);  // Redirect to login page after registration
      alert('Registration successful!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
