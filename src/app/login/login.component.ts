import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s ease-in-out')]),
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
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  coverEyes: boolean = false;
  avatarState: string = 'default';
  inputState: string = 'default';

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

  onPasswordFocus(isFocused: boolean) {
    this.coverEyes = isFocused;
  }

  onSubmit() {
    if (this.loginForm.valid && isPlatformBrowser(this.platformId)) {
      const userData = this.loginForm.value;
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

      const user = storedUsers.find(
        (u: any) => u.email === userData.email && u.password === userData.password
      );

      if (user) {
        // Log in using AuthService
        this.authService.login(user);

        // Determine user's role and navigate accordingly
        const userRole = user.role || 'guest';
        this.router.navigate([`/${userRole}-dashboard`]);
      } else {
        alert('Invalid credentials');
      }
    }
  }

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
