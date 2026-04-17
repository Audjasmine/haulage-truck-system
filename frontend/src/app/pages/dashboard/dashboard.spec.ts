import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Dashboard } from './dashboard';
import { ApiService } from '../../core/services/api.service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let apiServiceSpy: Pick<ApiService, 'getTrucks' | 'getDrivers' | 'getJobs'>;

  beforeEach(async () => {
    apiServiceSpy = {
      getTrucks: vi.fn().mockReturnValue(of([
        { id: 1, truck_id: 'TR-001', registration_number: 'ABC123', status: 'available' },
        { id: 2, truck_id: 'TR-002', registration_number: 'BCD234', status: 'in_transit' },
        { id: 3, truck_id: 'TR-003', registration_number: 'CDE345', status: 'maintenance' }
      ])),
      getDrivers: vi.fn().mockReturnValue(of([
        { id: 1, driver_id: 'DRV-001', name: 'Alice' },
        { id: 2, driver_id: 'DRV-002', name: 'Brian' },
        { id: 3, driver_id: 'DRV-003', name: 'Carol' },
        { id: 4, driver_id: 'DRV-004', name: 'David' }
      ])),
      getJobs: vi.fn().mockReturnValue(of([
        {
          id: 1,
          job_id: 'JOB-001',
          pickup_location: 'Harare',
          delivery_location: 'Bulawayo',
          cargo_description: 'Cement',
          status: 'pending',
          assigned_truck: null,
          assigned_driver: null
        },
        {
          id: 2,
          job_id: 'JOB-002',
          pickup_location: 'Harare',
          delivery_location: 'Mutare',
          cargo_description: 'Steel',
          status: 'assigned',
          assigned_truck: 2,
          assigned_driver: 2
        },
        {
          id: 3,
          job_id: 'JOB-003',
          pickup_location: 'Gweru',
          delivery_location: 'Masvingo',
          cargo_description: 'Fuel',
          status: 'completed',
          assigned_truck: 1,
          assigned_driver: 1
        }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [{ provide: ApiService, useValue: apiServiceSpy as ApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load counts on init', () => {
    expect(component.truckCount()).toBe(3);
    expect(component.driverCount()).toBe(4);
    expect(component.jobCount()).toBe(3);
  });

  it('should compute dashboard metrics', () => {
    expect(component.availableTruckCount()).toBe(1);
    expect(component.activeTruckCount()).toBe(1);
    expect(component.maintenanceTruckCount()).toBe(1);
    expect(component.pendingJobsCount()).toBe(1);
    expect(component.assignedJobsCount()).toBe(1);
    expect(component.completedJobsCount()).toBe(1);
  });
});
