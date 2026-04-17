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
    <div class="flex h-screen">
      <!-- Sidebar - only show when NOT on login page AND user is logged in -->
      <app-sidebar *ngIf="showSidebar()"></app-sidebar>
      
      <div class="flex-1 overflow-auto" [class.bg-gray-100]="showSidebar()">
        <div class="p-6">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: []
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
