import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsComp } from './ticket-details-comp';

describe('TicketDetailsComp', () => {
  let component: TicketDetailsComp;
  let fixture: ComponentFixture<TicketDetailsComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDetailsComp],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDetailsComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
