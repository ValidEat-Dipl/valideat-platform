import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCheckConflictComp } from './table-check-conflict-comp';

describe('TableCheckConflictComp', () => {
  let component: TableCheckConflictComp;
  let fixture: ComponentFixture<TableCheckConflictComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCheckConflictComp],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCheckConflictComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
