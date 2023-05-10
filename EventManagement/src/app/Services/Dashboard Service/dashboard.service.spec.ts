import { TestBed } from '@angular/core/testing';

import { DashboardServiceService } from './dashboard.service';

describe('DashboardServiceService', () => {
  let service: DashboardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
