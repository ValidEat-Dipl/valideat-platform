import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComp } from './breadcrumb-comp';

describe('BreadcrumbComp', () => {
  let component: BreadcrumbComp;
  let fixture: ComponentFixture<BreadcrumbComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComp],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
