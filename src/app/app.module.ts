import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';

// Import standalone components
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // Import standalone components
    HomeComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    ManagerDashboardComponent,
    EmployeeDashboardComponent,
    NavbarComponent,
    SidebarComponent
    // No need to import LoginComponent here since it's standalone
  ],
  providers: []
})
export class AppModule { }
