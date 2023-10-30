import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftCatFormComponent } from './add-shift-cat-form.component';

describe('AddShiftCatFormComponent', () => {
  let component: AddShiftCatFormComponent;
  let fixture: ComponentFixture<AddShiftCatFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShiftCatFormComponent]
    });
    fixture = TestBed.createComponent(AddShiftCatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
