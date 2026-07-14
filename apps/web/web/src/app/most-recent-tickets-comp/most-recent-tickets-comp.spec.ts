import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRecentTicketsComp } from './most-recent-tickets-comp';

describe('MostRecentTicketsComp', () => {
  let component: MostRecentTicketsComp;
  let fixture: ComponentFixture<MostRecentTicketsComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostRecentTicketsComp],
    }).compileComponents();

    fixture = TestBed.createComponent(MostRecentTicketsComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
