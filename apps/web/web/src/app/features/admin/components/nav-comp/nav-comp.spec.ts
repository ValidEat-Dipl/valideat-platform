import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComp } from './nav-comp';

describe('NavComp', () => {
  let component: NavComp;
  let fixture: ComponentFixture<NavComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComp],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
