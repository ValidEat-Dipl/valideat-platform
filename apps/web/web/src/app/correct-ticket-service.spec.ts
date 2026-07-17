import { TestBed } from '@angular/core/testing';

import { CorrectTicketService } from './correct-ticket-service';

describe('CorrectTicketService', () => {
  let service: CorrectTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorrectTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
