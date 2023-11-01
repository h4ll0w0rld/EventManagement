import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftplanLandingComponent } from './shiftplan-landing.component';

describe('ShiftplanLandingComponent', () => {
  let component: ShiftplanLandingComponent;
  let fixture: ComponentFixture<ShiftplanLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftplanLandingComponent]
    });
    fixture = TestBed.createComponent(ShiftplanLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
