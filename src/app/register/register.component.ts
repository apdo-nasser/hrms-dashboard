import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SuccessModalComponent],
})
export class RegisterComponent {
  registerForm: FormGroup;
  step: number = 1;

  @ViewChild(SuccessModalComponent) successModal!: SuccessModalComponent;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      role: ['', Validators.required],
      numEmployees: ['', Validators.required],
      industry: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  nextStep() {
    this.step++;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        registeredAt: new Date().toISOString(),
      };

      // Save data to localStorage
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      users.push(userData);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(userData));

      // Show the success modal
      this.successModal.open();

      // Redirect to login page after a short delay
      setTimeout(() => {
        this.successModal.close();
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
