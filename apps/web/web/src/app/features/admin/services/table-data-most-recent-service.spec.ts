import { TestBed } from '@angular/core/testing';

import { TableDataMostRecentService } from './table-data-most-recent-service';

describe('TableDataMostRecentService', () => {
  let service: TableDataMostRecentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataMostRecentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
