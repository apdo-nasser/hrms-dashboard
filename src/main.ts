// C:\Users\abdo.nasser\hrms-dashboard\src\main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // <-- Import provideRouter
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) // <-- Use provideRouter instead of RouterModule.forRoot
  ]
});
