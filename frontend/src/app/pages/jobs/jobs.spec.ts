import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Jobs } from './jobs';
import { ApiService } from '../../core/services/api.service';

describe('Jobs', () => {
  let component: Jobs;
  let fixture: ComponentFixture<Jobs>;
  let apiServiceSpy: Pick<ApiService, 'getJobs' | 'getTrucks' | 'getDrivers'>;

  beforeEach(async () => {
    apiServiceSpy = {
      getJobs: vi.fn().mockReturnValue(of([])),
      getTrucks: vi.fn().mockReturnValue(of([])),
      getDrivers: vi.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [Jobs],
      providers: [{ provide: ApiService, useValue: apiServiceSpy as ApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Jobs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
