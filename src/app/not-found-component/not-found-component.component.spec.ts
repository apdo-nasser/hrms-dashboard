import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>You do not have permission to access this page or it does not exist.</p>
      <a routerLink="/login">Go to Login</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 50px;
    }
    h1 {
      font-size: 2.5em;
      color: #ff4c4c;
    }
    p {
      font-size: 1.2em;
      margin: 20px 0;
    }
    a {
      color: #007bff;
      text-decoration: none;
      font-weight: bold;
    }
  `]
})
export class NotFoundComponent {}
