import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTicketComp } from './create-ticket-comp';

describe('CreateTicketComp', () => {
  let component: CreateTicketComp;
  let fixture: ComponentFixture<CreateTicketComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTicketComp],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTicketComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
