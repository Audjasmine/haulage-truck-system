import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Drivers } from './drivers';
import { ApiService } from '../../core/services/api.service';

describe('Drivers', () => {
  let component: Drivers;
  let fixture: ComponentFixture<Drivers>;
  let apiServiceSpy: Pick<ApiService, 'getDrivers'>;

  beforeEach(async () => {
    apiServiceSpy = {
      getDrivers: vi.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [Drivers],
      providers: [{ provide: ApiService, useValue: apiServiceSpy as ApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Drivers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
