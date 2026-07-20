import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComp } from './badge-comp';

describe('BadgeComp', () => {
  let component: BadgeComp;
  let fixture: ComponentFixture<BadgeComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComp],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
