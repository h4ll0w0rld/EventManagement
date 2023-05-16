import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardactivityComponent } from './dashboardactivity.component';

describe('DashboardactivityComponent', () => {
  let component: DashboardactivityComponent;
  let fixture: ComponentFixture<DashboardactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardactivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
