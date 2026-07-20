import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOverviewComp } from './admin-overview-comp';

describe('AdminOverview', () => {
  let component: AdminOverviewComp;
  let fixture: ComponentFixture<AdminOverviewComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOverviewComp],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOverviewComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
