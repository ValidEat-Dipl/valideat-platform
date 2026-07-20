import { TestBed } from '@angular/core/testing';

import { DeleteTicketService } from './delete-ticket-service';

describe('DeleteTicketService', () => {
  let service: DeleteTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
