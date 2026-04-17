import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-trucks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trucks.html',
  styleUrl: './trucks.css'
})
export class Trucks implements OnInit {
  trucks = signal<any[]>([]);
  isLoading = signal(false);

  truckForm = {
    truck_id: '',
    registration_number: '',
    capacity: '',
    status: 'available'
  };

  editingTruckId: number | null = null;
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadTrucks();
  }

  loadTrucks(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.api.getTrucks().subscribe({
      next: (trucks) => {
        this.trucks.set(trucks);
        this.isLoading.set(false);
      },
      error: () => {
        this.trucks.set([]);
        this.errorMessage.set('Failed to load trucks.');
        this.isLoading.set(false);
      }
    });
  }

  submitTruck(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    const payload = {
      truck_id: this.truckForm.truck_id,
      registration_number: this.truckForm.registration_number,
      capacity: this.truckForm.capacity,
      status: this.truckForm.status
    };

    if (this.editingTruckId) {
      this.api.updateTruck(this.editingTruckId, payload).subscribe({
        next: () => {
          this.successMessage.set('Truck updated successfully.');
          this.resetForm();
          this.loadTrucks();
        },
        error: (err) => {
          this.errorMessage.set(this.extractError(err));
        }
      });
    } else {
      this.api.createTruck(payload).subscribe({
        next: () => {
          this.successMessage.set('Truck created successfully.');
          this.resetForm();
          this.loadTrucks();
        },
        error: (err) => {
          this.errorMessage.set(this.extractError(err));
        }
      });
    }
  }

  editTruck(truck: any): void {
    this.editingTruckId = truck.id;
    this.truckForm = {
      truck_id: truck.truck_id,
      registration_number: truck.registration_number,
      capacity: truck.capacity,
      status: truck.status
    };
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  deleteTruck(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this truck?');
    if (!confirmed) return;

    this.api.deleteTruck(id).subscribe({
      next: () => {
        this.successMessage.set('Truck deleted successfully.');
        this.loadTrucks();
      },
      error: () => {
        this.errorMessage.set('Failed to delete truck.');
      }
    });
  }

  resetForm(): void {
    this.editingTruckId = null;
    this.truckForm = {
      truck_id: '',
      registration_number: '',
      capacity: '',
      status: 'available'
    };
  }

  extractError(err: any): string {
    if (err?.error) {
      const messages = Object.values(err.error).flat().join(' ');
      return messages || 'Something went wrong.';
    }
    return 'Something went wrong.';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'in_transit':
        return 'bg-blue-100 text-blue-700';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
