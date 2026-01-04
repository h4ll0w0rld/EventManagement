import { TestBed } from '@angular/core/testing';

import { EventhubService } from './eventhub.service';

describe('EventhubService', () => {
  let service: EventhubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventhubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
