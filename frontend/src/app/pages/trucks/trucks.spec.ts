import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Trucks } from './trucks';
import { ApiService } from '../../core/services/api.service';

describe('Trucks', () => {
  let component: Trucks;
  let fixture: ComponentFixture<Trucks>;
  let apiServiceSpy: Pick<ApiService, 'getTrucks'>;

  beforeEach(async () => {
    apiServiceSpy = {
      getTrucks: vi.fn().mockReturnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [Trucks],
      providers: [{ provide: ApiService, useValue: apiServiceSpy as ApiService }]
    }).compileComponents();

    fixture = TestBed.createComponent(Trucks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
