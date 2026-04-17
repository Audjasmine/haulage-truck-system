// src/app/app.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Sidebar } from './shared/sidebar/sidebar';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar],
  template: `
    <div class="app-shell" [class.app-shell-auth]="showSidebar()">
      <app-sidebar *ngIf="showSidebar()"></app-sidebar>
      
      <div class="app-content" [class.app-content-auth]="showSidebar()">
        <div class="content-pad">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
    }

    .app-shell-auth {
      background: linear-gradient(180deg, #d9d0c2 0%, #efe7da 100%);
      display: flex;
      min-height: 100vh;
    }

    .app-content {
      width: 100%;
    }

    .app-content-auth {
      flex: 1;
      min-width: 0;
    }

    .content-pad {
      padding: 1.5rem;
    }

    @media (max-width: 960px) {
      .app-shell-auth {
        flex-direction: column;
      }

      .content-pad {
        padding: 1rem;
      }
    }
  `]
})
export class App {
  showSidebar = signal(false);

  constructor(
    public router: Router,
    private auth: AuthService
  ) {
    this.checkSidebarVisibility();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkSidebarVisibility();
    });
  }

  checkSidebarVisibility() {
    const isLoginPage = this.router.url === '/login' || this.router.url === '/';
    
    this.showSidebar.set(this.auth.isAuthenticated() && !isLoginPage);
  }
}
