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
    <section class="login-shell">
      <div class="login-card">
        <div class="login-brand">
          <span class="brand-mark">HT</span>
          <div>
            <p class="brand-kicker">Operations Suite</p>
            <h1 class="brand-title">Haulage Management</h1>
          </div>
        </div>

        <div class="login-copy">
          <h2 class="login-heading">Sign in</h2>
          <p class="login-subcopy">Enter your username and password to continue.</p>
        </div>

        <div *ngIf="errorMessage()" class="login-message login-error">
          {{ errorMessage() }}
        </div>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <label class="login-field">
            <span class="field-label">Username</span>
            <input
              type="text"
              [(ngModel)]="username"
              name="username"
              class="field-input"
              autocomplete="username"
              required>
          </label>

          <label class="login-field">
            <span class="field-label">Password</span>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              class="field-input"
              autocomplete="current-password"
              required>
          </label>

          <button type="submit" class="login-button">
            Sign in
          </button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .login-shell {
      align-items: center;
      background:
        radial-gradient(circle at top left, rgba(201, 111, 45, 0.14), transparent 28%),
        radial-gradient(circle at bottom right, rgba(24, 58, 55, 0.12), transparent 24%),
        linear-gradient(180deg, #ece4d8 0%, #f5eee5 100%);
      display: flex;
      justify-content: center;
      min-height: 100vh;
      padding: 1.5rem;
    }

    .login-card {
      background: rgba(255, 250, 243, 0.9);
      border: 1px solid rgba(102, 77, 52, 0.1);
      border-radius: 28px;
      box-shadow: 0 24px 60px rgba(45, 35, 22, 0.08);
      max-width: 430px;
      padding: 1.5rem;
      width: 100%;
    }

    .login-brand {
      align-items: center;
      display: flex;
      gap: 0.85rem;
      margin-bottom: 1.35rem;
    }

    .brand-mark {
      align-items: center;
      background: linear-gradient(135deg, #c96f2d, #e29b60);
      border-radius: 16px;
      color: #fff8ef;
      display: inline-flex;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 1rem;
      font-weight: 700;
      height: 46px;
      justify-content: center;
      width: 46px;
    }

    .brand-kicker {
      color: #8d5b33;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      margin: 0;
      text-transform: uppercase;
    }

    .brand-title,
    .login-heading {
      color: #1f1f1a;
      font-family: Georgia, 'Times New Roman', serif;
      margin: 0.2rem 0 0;
    }

    .brand-title {
      font-size: 1.55rem;
    }

    .login-heading {
      font-size: 1.55rem;
    }

    .login-copy {
      margin-bottom: 1rem;
    }

    .login-subcopy {
      color: #665f54;
      font-size: 0.92rem;
      line-height: 1.55;
      margin: 0.45rem 0 0;
    }

    .login-message {
      border-radius: 16px;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      padding: 0.85rem 0.95rem;
    }

    .login-error {
      background: rgba(181, 71, 60, 0.12);
      border: 1px solid rgba(181, 71, 60, 0.14);
      color: #8f3027;
    }

    .login-form {
      display: grid;
      gap: 0.95rem;
    }

    .login-field {
      display: grid;
      gap: 0.35rem;
    }

    .field-label {
      color: #362f28;
      font-size: 0.88rem;
      font-weight: 600;
    }

    .field-input {
      background: rgba(255, 255, 255, 0.86);
      border: 1px solid rgba(102, 77, 52, 0.14);
      border-radius: 16px;
      color: #1f1f1a;
      font-size: 0.95rem;
      padding: 0.85rem 0.95rem;
    }

    .field-input:focus {
      border-color: rgba(24, 58, 55, 0.35);
      box-shadow: 0 0 0 3px rgba(24, 58, 55, 0.08);
      outline: none;
    }

    .login-button {
      background: #183a37;
      border: 0;
      border-radius: 999px;
      color: #fff8ef;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 600;
      margin-top: 0.25rem;
      padding: 0.9rem 1rem;
    }

    .login-button:hover {
      background: #132f2c;
    }

    @media (max-width: 640px) {
      .login-shell {
        padding: 1rem;
      }

      .login-card {
        padding: 1.25rem;
      }

      .brand-title,
      .login-heading {
        font-size: 1.35rem;
      }
    }
  `]
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
