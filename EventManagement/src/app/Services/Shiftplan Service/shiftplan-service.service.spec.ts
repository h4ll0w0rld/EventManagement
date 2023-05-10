import { TestBed } from '@angular/core/testing';

import { ShiftplanServiceService } from './shiftplan-service.service';

describe('ShiftplanServiceService', () => {
  let service: ShiftplanServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftplanServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
