// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expand, map, Observable, reduce } from 'rxjs';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ApiListResponse<T> {
  items: T[];
  count: number;
  next: string | null;
  previous: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(data: LoginCredentials) {
    return this.http.post<any>(`${this.baseUrl}/login/`, data);
  }

  private normalizeListResponse<T>(response: any): ApiListResponse<T> {
    if (Array.isArray(response)) {
      return {
        items: response,
        count: response.length,
        next: null,
        previous: null
      };
    }

    const items = Array.isArray(response?.results) ? response.results : [];
    const rawCount = typeof response?.count === 'number' ? response.count : items.length;

    return {
      items,
      count: rawCount,
      next: response?.next ?? null,
      previous: response?.previous ?? null
    };
  }

  private fetchAllPages<T>(url: string): Observable<T[]> {
    return this.http.get<any>(url).pipe(
      map((response) => this.normalizeListResponse<T>(response)),
      expand((response) => (
        response.next
          ? this.http.get<any>(response.next).pipe(map((nextResponse) => this.normalizeListResponse<T>(nextResponse)))
          : []
      )),
      reduce((items, response) => items.concat(response.items), [] as T[])
    );
  }

  getTrucksPage(): Observable<ApiListResponse<any>> {
    return this.http
      .get<any>(`${this.baseUrl}/trucks/`)
      .pipe(map((response) => this.normalizeListResponse(response)));
  }

  getTrucks(): Observable<any[]> {
    return this.fetchAllPages<any>(`${this.baseUrl}/trucks/`);
  }

  createTruck(data: any) {
    return this.http.post<any>(`${this.baseUrl}/trucks/`, data);
  }

  updateTruck(id: number, data: any) {
    return this.http.put<any>(`${this.baseUrl}/trucks/${id}/`, data);
  }

  deleteTruck(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/trucks/${id}/`);
  }

  getDriversPage(): Observable<ApiListResponse<any>> {
    return this.http
      .get<any>(`${this.baseUrl}/drivers/`)
      .pipe(map((response) => this.normalizeListResponse(response)));
  }

  getDrivers(): Observable<any[]> {
    return this.fetchAllPages<any>(`${this.baseUrl}/drivers/`);
  }

  createDriver(data: any) {
    return this.http.post<any>(`${this.baseUrl}/drivers/`, data);
  }

  updateDriver(id: number, data: any) {
    return this.http.put<any>(`${this.baseUrl}/drivers/${id}/`, data);
  }

  deleteDriver(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/drivers/${id}/`);
  }

  getJobsPage(): Observable<ApiListResponse<any>> {
    return this.http
      .get<any>(`${this.baseUrl}/jobs/`)
      .pipe(map((response) => this.normalizeListResponse(response)));
  }

  getJobs(): Observable<any[]> {
    return this.fetchAllPages<any>(`${this.baseUrl}/jobs/`);
  }

  createJob(data: any) {
    return this.http.post<any>(`${this.baseUrl}/jobs/`, data);
  }

  updateJob(id: number, data: any) {
    return this.http.put<any>(`${this.baseUrl}/jobs/${id}/`, data);
  }

  deleteJob(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/jobs/${id}/`);
  }
}
