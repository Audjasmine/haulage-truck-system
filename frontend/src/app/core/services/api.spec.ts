import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ApiService]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should normalize paginated list responses', () => {
    let responseCount = 0;

    service.getTrucksPage().subscribe((response) => {
      responseCount = response.count;
      expect(response.items.length).toBe(2);
    });

    const request = httpMock.expectOne('http://127.0.0.1:8000/api/trucks/');
    request.flush({
      count: 7,
      next: null,
      previous: null,
      results: [{ id: 1 }, { id: 2 }]
    });

    expect(responseCount).toBe(7);
  });
});
