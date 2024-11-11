import { Component, Inject, PLATFORM_ID, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';  // Import Angular animations

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s ease-in-out')])
    ]),
    trigger('moveAvatar', [
      state('default', style({ transform: 'translateY(0)' })),
      state('moved', style({ transform: 'translateY(-20px)' })),
      transition('default <=> moved', [animate('0.5s ease-out')]),
    ]),
    trigger('moveInputs', [
      state('default', style({ transform: 'translateX(0)' })),
      state('moved', style({ transform: 'translateX(10px)' })),
      transition('default <=> moved', [animate('0.3s ease-in-out')]),
    ]),
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  coverEyes: boolean = false; // Controls the hand visibility
  @Output() loginStatus = new EventEmitter<boolean>(); // Emit login status

  avatarState: string = 'default'; // Controls avatar movement
  inputState: string = 'default'; // Controls input movement

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
          // Store logged-in user data in localStorage
          localStorage.setItem('user', JSON.stringify(user));

          // Determine user's role and navigate accordingly
          const userRole = user.role || 'guest';
          this.router.navigate([`/${userRole}-dashboard`]);

          // Emit successful login status to other components
          this.loginStatus.emit(true);
        } else {
          alert('Invalid credentials');
        }
      }
    }
  }

  // Trigger the avatar and input animations when the form is interacted with
  onAvatarClick() {
    this.avatarState = this.avatarState === 'default' ? 'moved' : 'default';
  }

  onInputFocus() {
    this.inputState = 'moved';
  }

  onInputBlur() {
    this.inputState = 'default';
  }
}
