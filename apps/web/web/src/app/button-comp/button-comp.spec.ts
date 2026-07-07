import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComp } from './button-comp';

describe('ButtonComp', () => {
  let component: ButtonComp;
  let fixture: ComponentFixture<ButtonComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
