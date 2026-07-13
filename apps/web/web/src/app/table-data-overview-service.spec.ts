import { TestBed } from '@angular/core/testing';

import { TableDataOverviewService } from './table-data-overview-service';

describe('TableDataOverviewService', () => {
  let service: TableDataOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
