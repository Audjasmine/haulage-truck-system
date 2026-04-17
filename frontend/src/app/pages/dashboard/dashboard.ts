import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

type Truck = {
  id: number;
  truck_id: string;
  registration_number: string;
  status: 'available' | 'in_transit' | 'maintenance' | string;
};

type Driver = {
  id: number;
  driver_id: string;
  name: string;
};

type Job = {
  id: number;
  job_id: string;
  pickup_location: string;
  delivery_location: string;
  cargo_description: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'completed' | 'cancelled' | string;
  assigned_truck: number | Truck | null;
  assigned_driver: number | Driver | null;
};

type AlertCard = {
  tone: 'amber' | 'blue' | 'red' | 'green';
  label: string;
  value: number;
  detail: string;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  trucks = signal<Truck[]>([]);
  drivers = signal<Driver[]>([]);
  jobs = signal<Job[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  truckCount = computed(() => this.trucks().length);
  driverCount = computed(() => this.drivers().length);
  jobCount = computed(() => this.jobs().length);

  availableTruckCount = computed(() => this.countTrucksByStatus('available'));
  activeTruckCount = computed(() => this.countTrucksByStatus('in_transit'));
  maintenanceTruckCount = computed(() => this.countTrucksByStatus('maintenance'));

  pendingJobsCount = computed(() => this.countJobsByStatus('pending'));
  assignedJobsCount = computed(() => this.countJobsByStatus('assigned'));
  inTransitJobsCount = computed(() => this.countJobsByStatus('in_transit'));
  completedJobsCount = computed(() => this.countJobsByStatus('completed'));
  cancelledJobsCount = computed(() => this.countJobsByStatus('cancelled'));

  activeDriversCount = computed(() => {
    const activeDriverIds = new Set(
      this.jobs()
        .filter((job) => ['assigned', 'in_transit'].includes(job.status))
        .map((job) => this.extractEntityId(job.assigned_driver))
        .filter((id): id is number => id !== null)
    );

    return activeDriverIds.size;
  });

  fleetUtilization = computed(() => this.toPercent(this.activeTruckCount(), this.truckCount()));
  jobCompletionRate = computed(() => this.toPercent(this.completedJobsCount(), this.jobCount()));
  assignmentRate = computed(() => this.toPercent(this.activeDriversCount(), this.driverCount()));

  recentJobs = computed(() =>
    [...this.jobs()]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5)
  );

  alertCards = computed<AlertCard[]>(() => [
    {
      tone: 'amber',
      label: 'Pending Dispatch',
      value: this.pendingJobsCount(),
      detail: 'Jobs waiting for truck and driver allocation.'
    },
    {
      tone: 'blue',
      label: 'Fleet Active',
      value: this.activeTruckCount(),
      detail: 'Trucks currently running assigned or in-transit work.'
    },
    {
      tone: 'red',
      label: 'Maintenance Queue',
      value: this.maintenanceTruckCount(),
      detail: 'Units unavailable for dispatch until maintenance clears.'
    },
    {
      tone: 'green',
      label: 'Completed Jobs',
      value: this.completedJobsCount(),
      detail: 'Workloads successfully completed and closed out.'
    }
  ]);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      trucks: this.api.getTrucks(),
      drivers: this.api.getDrivers(),
      jobs: this.api.getJobs()
    }).subscribe({
      next: ({ trucks, drivers, jobs }) => {
        this.trucks.set(trucks);
        this.drivers.set(drivers);
        this.jobs.set(jobs);
        this.isLoading.set(false);
      },
      error: () => {
        this.trucks.set([]);
        this.drivers.set([]);
        this.jobs.set([]);
        this.errorMessage.set('Failed to load dashboard data.');
        this.isLoading.set(false);
      }
    });
  }

  refresh(): void {
    this.loadDashboard();
  }

  getTruckLabel(value: Job['assigned_truck']): string {
    if (!value) {
      return 'Unassigned';
    }

    if (typeof value === 'object') {
      return `${value.truck_id} / ${value.registration_number}`;
    }

    const truck = this.trucks().find((item) => item.id === value);
    return truck ? `${truck.truck_id} / ${truck.registration_number}` : 'Unassigned';
  }

  getDriverLabel(value: Job['assigned_driver']): string {
    if (!value) {
      return 'Unassigned';
    }

    if (typeof value === 'object') {
      return `${value.driver_id} / ${value.name}`;
    }

    const driver = this.drivers().find((item) => item.id === value);
    return driver ? `${driver.driver_id} / ${driver.name}` : 'Unassigned';
  }

  formatStatus(status: string): string {
    return status.replace('_', ' ');
  }

  statusWidth(value: number, total: number): string {
    return `${this.toPercent(value, total)}%`;
  }

  alertToneClass(tone: AlertCard['tone']): string {
    switch (tone) {
      case 'amber':
        return 'alert-amber';
      case 'blue':
        return 'alert-blue';
      case 'red':
        return 'alert-red';
      case 'green':
        return 'alert-green';
      default:
        return '';
    }
  }

  jobStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-green';
      case 'assigned':
      case 'in_transit':
        return 'status-blue';
      case 'pending':
        return 'status-amber';
      case 'cancelled':
        return 'status-red';
      default:
        return 'status-slate';
    }
  }

  private countTrucksByStatus(status: string): number {
    return this.trucks().filter((truck) => truck.status === status).length;
  }

  private countJobsByStatus(status: string): number {
    return this.jobs().filter((job) => job.status === status).length;
  }

  private toPercent(value: number, total: number): number {
    if (!total) {
      return 0;
    }

    return Math.round((value / total) * 100);
  }

  private extractEntityId(value: number | { id: number } | null): number | null {
    if (typeof value === 'number') {
      return value;
    }

    if (value && typeof value === 'object' && typeof value.id === 'number') {
      return value.id;
    }

    return null;
  }
}
