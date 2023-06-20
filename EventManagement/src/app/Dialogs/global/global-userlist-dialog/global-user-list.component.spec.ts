import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalUserListComponent } from './global-user-list.component';

describe('GlobalUserListComponent', () => {
  let component: GlobalUserListComponent;
  let fixture: ComponentFixture<GlobalUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalUserListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
