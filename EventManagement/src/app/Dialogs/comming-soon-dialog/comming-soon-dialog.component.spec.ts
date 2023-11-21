import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommingSoonDialogComponent } from './comming-soon-dialog.component';

describe('CommingSoonDialogComponent', () => {
  let component: CommingSoonDialogComponent;
  let fixture: ComponentFixture<CommingSoonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommingSoonDialogComponent]
    });
    fixture = TestBed.createComponent(CommingSoonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
