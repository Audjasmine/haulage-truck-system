import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { Sidebar } from './sidebar';
import { AuthService } from '../../core/services/auth.service';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;
  let authServiceSpy: Pick<AuthService, 'logout'>;

  beforeEach(async () => {
    authServiceSpy = {
      logout: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Sidebar],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy as AuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate logout to auth service', () => {
    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
