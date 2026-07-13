import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCompAdminOverview } from './table-comp-admin-overview';

describe('TableCompAdminOverview', () => {
  let component: TableCompAdminOverview;
  let fixture: ComponentFixture<TableCompAdminOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableCompAdminOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCompAdminOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
