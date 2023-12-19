import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLandingComponent } from './auth-landing.component';

describe('AuthLandingComponent', () => {
  let component: AuthLandingComponent;
  let fixture: ComponentFixture<AuthLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthLandingComponent]
    });
    fixture = TestBed.createComponent(AuthLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
