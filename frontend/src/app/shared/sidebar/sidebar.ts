
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="w-64 bg-gray-900 text-white h-full flex flex-col">
      <div class="p-6">
        <h2 class="text-2xl font-bold">Haulage Mgmt</h2>
      </div>
      
      <nav class="flex-1">
        <a routerLink="/dashboard" 
           routerLinkActive="bg-gray-800"
           class="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Dashboard
        </a>
        
        <a routerLink="/trucks" 
           routerLinkActive="bg-gray-800"
           class="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 18L12 22M12 22L16 18M12 22V2"></path>
          </svg>
          Trucks
        </a>
        
        <a routerLink="/drivers" 
           routerLinkActive="bg-gray-800"
           class="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          Drivers
        </a>
        
        <a routerLink="/jobs" 
           routerLinkActive="bg-gray-800"
           class="flex items-center px-6 py-3 hover:bg-gray-800 transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          Jobs
        </a>
      </nav>

      <!-- Logout Button at bottom -->
      <div class="p-6 border-t border-gray-800">
        <button 
          (click)="logout()" 
          class="flex items-center w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout
        </button>
      </div>
    </div>
  `,
  styles: [`
    .router-link-active {
      background-color: rgb(31, 41, 55);
    }
  `]
})
export class Sidebar {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
