import { TestBed } from '@angular/core/testing';

import { TableDataExpiredService } from './table-data-expired-service';

describe('TableDataExpiredService', () => {
  let service: TableDataExpiredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataExpiredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
