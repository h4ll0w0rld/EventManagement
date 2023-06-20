import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelUserDialogComponent } from './del-user-dialog.component';

describe('DelUserDialogComponent', () => {
  let component: DelUserDialogComponent;
  let fixture: ComponentFixture<DelUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
