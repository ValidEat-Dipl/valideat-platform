import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectTicketComp } from './correct-ticket-comp';

describe('CorrectTicketComp', () => {
  let component: CorrectTicketComp;
  let fixture: ComponentFixture<CorrectTicketComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorrectTicketComp],
    }).compileComponents();

    fixture = TestBed.createComponent(CorrectTicketComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
