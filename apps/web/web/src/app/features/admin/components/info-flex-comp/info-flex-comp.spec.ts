import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFlexComp } from './info-flex-comp';

describe('InfoFlexComp', () => {
  let component: InfoFlexComp;
  let fixture: ComponentFixture<InfoFlexComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoFlexComp],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoFlexComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
