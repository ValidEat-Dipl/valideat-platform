import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearingTicketsComp } from './clearing-tickets-comp';

describe('ClearingTicketsComp', () => {
  let component: ClearingTicketsComp;
  let fixture: ComponentFixture<ClearingTicketsComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearingTicketsComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearingTicketsComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
