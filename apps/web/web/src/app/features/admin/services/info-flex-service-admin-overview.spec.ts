import { TestBed } from '@angular/core/testing';

import { InfoFlexServiceAdminOverview } from './info-flex-service-admin-overview';

describe('InfoFlexServiceAdminOverview', () => {
  let service: InfoFlexServiceAdminOverview;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoFlexServiceAdminOverview);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
