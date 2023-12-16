import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftPersonalActivityComponent } from './shift-personal-activity.component';

describe('ShiftPersonalActivityComponent', () => {
  let component: ShiftPersonalActivityComponent;
  let fixture: ComponentFixture<ShiftPersonalActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftPersonalActivityComponent]
    });
    fixture = TestBed.createComponent(ShiftPersonalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
