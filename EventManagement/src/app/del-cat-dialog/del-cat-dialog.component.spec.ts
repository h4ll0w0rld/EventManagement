import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelCatDialogComponent } from './del-cat-dialog.component';

describe('DelCatDialogComponent', () => {
  let component: DelCatDialogComponent;
  let fixture: ComponentFixture<DelCatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelCatDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelCatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
