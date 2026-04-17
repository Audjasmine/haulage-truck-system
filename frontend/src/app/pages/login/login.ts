// src/app/pages/login/login.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-900">
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-block p-3 bg-gray-100 rounded-full mb-4">
            <svg class="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 18L12 22M12 22L16 18M12 22V2"></path>
              <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-800">Haulage Truck Management</h1>
          <p class="text-gray-500 text-sm mt-2">Logistics Management System</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              [(ngModel)]="username" 
              name="username"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
              placeholder="Enter your username"
              required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password"
              class="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400 focus:border-gray-400 outline-none transition"
              placeholder="Enter your password"
              required>
          </div>

          <button 
            type="submit" 
            class="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded transition duration-200">
            Login
          </button>

          <div *ngIf="errorMessage()" class="text-red-500 text-sm text-center mt-3">
            {{ errorMessage() }}
          </div>
        </form>
      </div>
    </div>
  `
})
export class Login implements OnInit {
  username = '';
  password = '';
  errorMessage = signal('');

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    this.errorMessage.set('');
    
    const loginData = {
      username: this.username,
      password: this.password
    };
    
    this.api.login(loginData).subscribe({
      next: (response) => {
        const token = response.token || response.key || response.access_token || '';

        if (token) {
          this.auth.setToken(token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage.set('Login failed: No token received');
        }
      },
      error: () => {
        this.errorMessage.set('Invalid username or password');
      }
    });
  }
}
