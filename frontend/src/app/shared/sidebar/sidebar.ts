
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="nav-shell">
      <div class="nav-brand">
        <span class="brand-mark">HT</span>
        <div>
          <p class="brand-kicker">Operations Suite</p>
          <h2 class="brand-title">Haulage Mgmt</h2>
        </div>
      </div>
      
      <nav class="nav-links">
        <a routerLink="/dashboard" 
           routerLinkActive="nav-link-active"
           class="nav-link">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Dashboard
        </a>
        
        <a routerLink="/trucks" 
           routerLinkActive="nav-link-active"
           class="nav-link">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 18L12 22M12 22L16 18M12 22V2"></path>
          </svg>
          Trucks
        </a>
        
        <a routerLink="/drivers" 
           routerLinkActive="nav-link-active"
           class="nav-link">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Drivers
        </a>
        
        <a routerLink="/jobs" 
           routerLinkActive="nav-link-active"
           class="nav-link">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          Jobs
        </a>
      </nav>

      <div class="nav-footer">
        <button 
          (click)="logout()" 
          class="logout-button">
          <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .nav-shell {
      background:
        radial-gradient(circle at top, rgba(201, 111, 45, 0.12), transparent 24%),
        linear-gradient(180deg, #1c2623 0%, #101714 100%);
      border-right: 1px solid rgba(255, 248, 239, 0.08);
      color: #f7f0e6;
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: sticky;
      top: 0;
      padding: 1.5rem 1rem;
      width: 280px;
    }

    .nav-brand {
      align-items: center;
      display: flex;
      gap: 0.9rem;
      margin-bottom: 2rem;
      padding: 0.5rem 0.75rem;
    }

    .brand-mark {
      align-items: center;
      background: linear-gradient(135deg, #c96f2d, #e29b60);
      border-radius: 18px;
      color: #fff8ef;
      display: inline-flex;
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 1.1rem;
      font-weight: 700;
      height: 52px;
      justify-content: center;
      width: 52px;
    }

    .brand-kicker {
      color: rgba(247, 240, 230, 0.62);
      font-size: 0.73rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      margin: 0;
      text-transform: uppercase;
    }

    .brand-title {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 1.75rem;
      margin: 0.2rem 0 0;
    }

    .nav-links {
      display: grid;
      gap: 0.45rem;
    }

    .nav-link,
    .logout-button {
      align-items: center;
      border-radius: 18px;
      color: rgba(247, 240, 230, 0.86);
      display: flex;
      font-weight: 600;
      gap: 0.8rem;
      padding: 0.95rem 1rem;
      text-decoration: none;
      transition: background-color 120ms ease, transform 120ms ease, color 120ms ease;
    }

    .nav-link:hover,
    .logout-button:hover {
      background: rgba(255, 248, 239, 0.08);
      color: #fff8ef;
      transform: translateY(-1px);
    }

    .nav-link-active {
      background: rgba(255, 248, 239, 0.1);
      color: #fff8ef;
    }

    .nav-icon {
      height: 20px;
      width: 20px;
    }

    .nav-footer {
      border-top: 1px solid rgba(255, 248, 239, 0.08);
      margin-top: auto;
      padding-top: 1rem;
    }

    .logout-button {
      background: rgba(181, 71, 60, 0.14);
      border: 0;
      cursor: pointer;
      width: 100%;
    }

    @media (max-width: 960px) {
      .nav-shell {
        height: auto;
        min-height: auto;
        position: static;
        width: 100%;
      }
    }
  `]
})
export class Sidebar {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
