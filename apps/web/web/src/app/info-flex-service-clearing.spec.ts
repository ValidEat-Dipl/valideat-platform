import { TestBed } from '@angular/core/testing';

import { InfoFlexServiceClearing } from './info-flex-service-clearing';

describe('InfoFlexServiceClearing', () => {
  let service: InfoFlexServiceClearing;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoFlexServiceClearing);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
