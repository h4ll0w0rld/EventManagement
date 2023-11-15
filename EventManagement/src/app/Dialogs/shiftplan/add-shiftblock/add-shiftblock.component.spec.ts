import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftblockComponent } from './add-shiftblock.component';

describe('AddShiftblockComponent', () => {
  let component: AddShiftblockComponent;
  let fixture: ComponentFixture<AddShiftblockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShiftblockComponent]
    });
    fixture = TestBed.createComponent(AddShiftblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
