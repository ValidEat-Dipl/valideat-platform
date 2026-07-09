import { TestBed } from '@angular/core/testing';

import { InfoFlexService } from './info-flex-service';

describe('InfoFlexService', () => {
  let service: InfoFlexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoFlexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
