import { TestBed } from '@angular/core/testing';

import { TicketDetailService } from './ticket-detail-service';

describe('TicketDetailService', () => {
  let service: TicketDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
