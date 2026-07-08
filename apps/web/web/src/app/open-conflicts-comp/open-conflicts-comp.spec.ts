import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenConflictsComp } from './open-conflicts-comp';

describe('OpenConflictsComp', () => {
  let component: OpenConflictsComp;
  let fixture: ComponentFixture<OpenConflictsComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenConflictsComp],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenConflictsComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
