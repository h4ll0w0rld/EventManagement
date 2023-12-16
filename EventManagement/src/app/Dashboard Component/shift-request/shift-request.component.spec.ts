import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRequestComponent } from './shift-request.component';

describe('ShiftRequestComponent', () => {
  let component: ShiftRequestComponent;
  let fixture: ComponentFixture<ShiftRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftRequestComponent]
    });
    fixture = TestBed.createComponent(ShiftRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
