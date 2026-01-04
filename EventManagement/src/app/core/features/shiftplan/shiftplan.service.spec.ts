import { TestBed } from '@angular/core/testing';

import { ShiftplanService } from './shiftplan.service';

describe('ShiftplanService', () => {
  let service: ShiftplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
