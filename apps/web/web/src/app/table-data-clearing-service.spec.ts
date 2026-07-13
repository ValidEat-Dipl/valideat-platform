import { TestBed } from '@angular/core/testing';

import { TableDataClearingService } from './table-data-clearing-service';

describe('TableDataClearingService', () => {
  let service: TableDataClearingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataClearingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
