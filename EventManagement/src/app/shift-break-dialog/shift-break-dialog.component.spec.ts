import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftBreakDialogComponent } from './shift-break-dialog.component';

describe('ShiftBreakDialogComponent', () => {
  let component: ShiftBreakDialogComponent;
  let fixture: ComponentFixture<ShiftBreakDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftBreakDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftBreakDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
