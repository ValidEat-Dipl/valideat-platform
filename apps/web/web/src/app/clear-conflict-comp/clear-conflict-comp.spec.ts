import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearConflictComp } from './clear-conflict-comp';

describe('ClearConflictComp', () => {
  let component: ClearConflictComp;
  let fixture: ComponentFixture<ClearConflictComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearConflictComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearConflictComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
