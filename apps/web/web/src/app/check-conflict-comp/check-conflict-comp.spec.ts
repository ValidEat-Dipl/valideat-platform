import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckConflictComp } from './check-conflict-comp';

describe('CheckConflictComp', () => {
  let component: CheckConflictComp;
  let fixture: ComponentFixture<CheckConflictComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckConflictComp],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckConflictComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
