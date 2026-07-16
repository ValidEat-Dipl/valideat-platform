import { TestBed } from '@angular/core/testing';

import { CreateAdminTicketService } from './create-admin-ticket-service';

describe('CreateAdminTicketService', () => {
  let service: CreateAdminTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAdminTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
