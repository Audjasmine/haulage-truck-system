import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

type DriverRecord = {
  id: number;
  driver_id: string;
  name: string;
  license_number: string;
  phone_number: string;
};

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drivers.html',
  styleUrl: './drivers.css'
})
export class Drivers implements OnInit {
  drivers = signal<DriverRecord[]>([]);
  isLoading = signal(false);

  driverForm = {
    driver_id: '',
    name: '',
    license_number: '',
    phone_number: ''
  };

  editingDriverId: number | null = null;
  errorMessage = signal('');
  successMessage = signal('');

  driverCount = computed(() => this.drivers().length);

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.api.getDrivers().subscribe({
      next: (drivers) => {
        this.drivers.set(drivers);
        this.isLoading.set(false);
      },
      error: () => {
        this.drivers.set([]);
        this.errorMessage.set('Failed to load drivers.');
        this.isLoading.set(false);
      }
    });
  }

  submitDriver(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload = {
      driver_id: this.driverForm.driver_id,
      name: this.driverForm.name,
      license_number: this.driverForm.license_number,
      phone_number: this.driverForm.phone_number
    };

    if (this.editingDriverId) {
      this.api.updateDriver(this.editingDriverId, payload).subscribe({
        next: () => {
          this.successMessage.set('Driver updated successfully.');
          this.resetForm();
          this.loadDrivers();
        },
        error: (err: any) => {
          this.errorMessage.set(this.extractError(err));
        }
      });
    } else {
      this.api.createDriver(payload).subscribe({
        next: () => {
          this.successMessage.set('Driver created successfully.');
          this.resetForm();
          this.loadDrivers();
        },
        error: (err: any) => {
          this.errorMessage.set(this.extractError(err));
        }
      });
    }
  }

  editDriver(driver: DriverRecord): void {
    this.editingDriverId = driver.id;
    this.driverForm = {
      driver_id: driver.driver_id,
      name: driver.name,
      license_number: driver.license_number,
      phone_number: driver.phone_number
    };
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  deleteDriver(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this driver?');
    if (!confirmed) return;

    this.api.deleteDriver(id).subscribe({
      next: () => {
        this.successMessage.set('Driver deleted successfully.');
        this.loadDrivers();
      },
      error: () => {
        this.errorMessage.set('Failed to delete driver.');
      }
    });
  }

  resetForm(): void {
    this.editingDriverId = null;
    this.driverForm = {
      driver_id: '',
      name: '',
      license_number: '',
      phone_number: ''
    };
  }

  extractError(err: any): string {
    if (err?.error) {
      const messages = Object.values(err.error).flat().join(' ');
      return messages || 'Something went wrong.';
    }
    return 'Something went wrong.';
  }
}
