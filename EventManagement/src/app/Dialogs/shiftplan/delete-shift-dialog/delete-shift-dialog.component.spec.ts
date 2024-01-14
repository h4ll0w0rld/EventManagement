import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShiftDialogComponent } from './delete-shift-dialog.component';

describe('DeleteShiftDialogComponent', () => {
  let component: DeleteShiftDialogComponent;
  let fixture: ComponentFixture<DeleteShiftDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteShiftDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteShiftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
