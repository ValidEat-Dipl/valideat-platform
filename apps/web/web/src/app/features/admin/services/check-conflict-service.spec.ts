import { TestBed } from '@angular/core/testing';

import { CheckConflictService } from './check-conflict-service';

describe('CheckConflictService', () => {
  let service: CheckConflictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckConflictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
