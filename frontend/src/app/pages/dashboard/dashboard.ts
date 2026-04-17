import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  truckCount = signal(0);
  driverCount = signal(0);
  jobCount = signal(0);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      trucks: this.api.getTrucksPage(),
      drivers: this.api.getDriversPage(),
      jobs: this.api.getJobsPage()
    }).subscribe({
      next: ({ trucks, drivers, jobs }) => {
        this.truckCount.set(trucks.count);
        this.driverCount.set(drivers.count);
        this.jobCount.set(jobs.count);
        this.isLoading.set(false);
      },
      error: () => {
        this.truckCount.set(0);
        this.driverCount.set(0);
        this.jobCount.set(0);
        this.errorMessage.set('Failed to load dashboard data.');
        this.isLoading.set(false);
      }
    });
  }

  refresh(): void {
    this.loadCounts();
  }
}
