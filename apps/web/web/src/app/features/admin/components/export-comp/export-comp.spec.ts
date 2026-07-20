import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComp } from './export-comp';

describe('ExportComp', () => {
  let component: ExportComp;
  let fixture: ComponentFixture<ExportComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
