import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComp } from './alert-comp';

describe('AlertComp', () => {
  let component: AlertComp;
  let fixture: ComponentFixture<AlertComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComp],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
