import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Dashboard } from './dashboard';
import { ApiService } from '../../core/services/api.service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let apiServiceSpy: Pick<ApiService, 'getTrucksPage' | 'getDriversPage' | 'getJobsPage'>;

  beforeEach(async () => {
    apiServiceSpy = {
      getTrucksPage: vi.fn().mockReturnValue(of({ items: [], count: 3, next: null, previous: null })),
      getDriversPage: vi.fn().mockReturnValue(of({ items: [], count: 4, next: null, previous: null })),
      getJobsPage: vi.fn().mockReturnValue(of({ items: [], count: 5, next: null, previous: null }))
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
    expect(component.jobCount()).toBe(5);
  });
});
