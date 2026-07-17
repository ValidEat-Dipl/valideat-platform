import { TestBed } from '@angular/core/testing';

import { OpenConflictsService } from './open-conflicts-service';

describe('OpenConflictsService', () => {
  let service: OpenConflictsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenConflictsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
