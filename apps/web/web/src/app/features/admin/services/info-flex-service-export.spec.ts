import { TestBed } from '@angular/core/testing';

import { InfloFlexServiceExport } from './info-flex-service-export';

describe('InfloFlexServiceExport', () => {
  let service: InfloFlexServiceExport;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfloFlexServiceExport);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
