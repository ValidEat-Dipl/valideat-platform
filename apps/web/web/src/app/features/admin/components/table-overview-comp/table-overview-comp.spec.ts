import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOverviewComp } from './table-overview-comp';

describe('TableOverviewComp', () => {
  let component: TableOverviewComp;
  let fixture: ComponentFixture<TableOverviewComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOverviewComp],
    }).compileComponents();

    fixture = TestBed.createComponent(TableOverviewComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
