import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css'
})
export class Jobs implements OnInit {
  jobs = signal<any[]>([]);
  trucks = signal<any[]>([]);
  drivers = signal<any[]>([]);
  isLoading = signal(false);

  jobForm = {
    job_id: '',
    pickup_location: '',
    delivery_location: '',
    cargo_description: '',
    status: 'pending',
    assigned_truck: '',
    assigned_driver: ''
  };

  editingJobId: number | null = null;
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadPageData();
  }

  loadPageData(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    forkJoin({
      jobs: this.api.getJobs(),
      trucks: this.api.getTrucks(),
      drivers: this.api.getDrivers()
    }).subscribe({
      next: ({ jobs, trucks, drivers }) => {
        this.jobs.set(jobs);
        this.trucks.set(trucks);
        this.drivers.set(drivers);
        this.isLoading.set(false);
      },
      error: () => {
        this.jobs.set([]);
        this.trucks.set([]);
        this.drivers.set([]);
        this.errorMessage.set('Failed to load jobs.');
        this.isLoading.set(false);
      }
    });
  }

  submitJob(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload = {
      job_id: this.jobForm.job_id,
      pickup_location: this.jobForm.pickup_location,
      delivery_location: this.jobForm.delivery_location,
      cargo_description: this.jobForm.cargo_description,
      status: this.jobForm.status,
      assigned_truck: this.jobForm.assigned_truck || null,
      assigned_driver: this.jobForm.assigned_driver || null
    };

    if (this.editingJobId) {
      this.api.updateJob(this.editingJobId, payload).subscribe({
        next: () => {
          this.successMessage.set('Job updated successfully.');
          this.resetForm();
          this.loadPageData();
        },
        error: (err) => {
          this.errorMessage.set(this.extractError(err));
        }
      });
    } else {
      this.api.createJob(payload).subscribe({
        next: () => {
          this.successMessage.set('Job created successfully.');
          this.resetForm();
          this.loadPageData();
        },
        error: (err) => {
          this.errorMessage.set(this.extractError(err));
        }
      });
    }
  }

  editJob(job: any): void {
    this.editingJobId = job.id;
    this.jobForm = {
      job_id: job.job_id,
      pickup_location: job.pickup_location,
      delivery_location: job.delivery_location,
      cargo_description: job.cargo_description,
      status: job.status,
      assigned_truck: job.assigned_truck ?? '',
      assigned_driver: job.assigned_driver ?? ''
    };
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  deleteJob(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this job?');
    if (!confirmed) return;

    this.api.deleteJob(id).subscribe({
      next: () => {
        this.successMessage.set('Job deleted successfully.');
        this.loadPageData();
      },
      error: () => {
        this.errorMessage.set('Failed to delete job.');
      }
    });
  }

  resetForm(): void {
    this.editingJobId = null;
    this.jobForm = {
      job_id: '',
      pickup_location: '',
      delivery_location: '',
      cargo_description: '',
      status: 'pending',
      assigned_truck: '',
      assigned_driver: ''
    };
  }

  extractError(err: any): string {
    if (err?.error) {
      const messages = Object.values(err.error).flat().join(' ');
      return messages || 'Something went wrong.';
    }
    return 'Something went wrong.';
  }

  getTruckLabel(value: any): string {
  if (!value) return 'Unassigned';

  if (typeof value === 'object') {
    if (value.truck_id) {
      return `${value.truck_id} - ${value.registration_number ?? ''}`.trim();
    }
    if (value.id) {
      const truck = this.trucks().find(t => t.id === value.id);
      return truck ? `${truck.truck_id} - ${truck.registration_number}` : 'Unassigned';
    }
  }

  const truck = this.trucks().find(
    t => t.id === Number(value) || t.truck_id === value
  );

  return truck ? `${truck.truck_id} - ${truck.registration_number}` : 'Unassigned';
}

getDriverLabel(value: any): string {
  if (!value) return 'Unassigned';

  if (typeof value === 'object') {
    if (value.driver_id) {
      return `${value.driver_id} - ${value.name ?? ''}`.trim();
    }
    if (value.id) {
      const driver = this.drivers().find(d => d.id === value.id);
      return driver ? `${driver.driver_id} - ${driver.name}` : 'Unassigned';
    }
  }

  const driver = this.drivers().find(
    d => d.id === Number(value) || d.driver_id === value
  );

  return driver ? `${driver.driver_id} - ${driver.name}` : 'Unassigned';
}

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'assigned':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
