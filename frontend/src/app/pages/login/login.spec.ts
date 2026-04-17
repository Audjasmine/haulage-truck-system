import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { Login } from './login';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authServiceSpy: Pick<AuthService, 'isAuthenticated' | 'setToken'>;
  let apiServiceSpy: Pick<ApiService, 'login'>;
  let router: Router;

  beforeEach(async () => {
    authServiceSpy = {
      isAuthenticated: vi.fn().mockReturnValue(false),
      setToken: vi.fn()
    };
    apiServiceSpy = {
      login: vi.fn().mockReturnValue(of({ token: 'token' }))
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy as AuthService },
        { provide: ApiService, useValue: apiServiceSpy as ApiService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard after successful login', () => {
    component.username = 'demo';
    component.password = 'demo';

    component.onSubmit();

    expect(apiServiceSpy.login).toHaveBeenCalled();
    expect(authServiceSpy.setToken).toHaveBeenCalledWith('token');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
