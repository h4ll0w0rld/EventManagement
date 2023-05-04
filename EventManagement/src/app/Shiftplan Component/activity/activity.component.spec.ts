import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< Updated upstream:EventManagement/src/app/shift-plan/shift-plan.component.spec.ts
import { ShiftPlanComponent } from './shift-plan.component';

describe('ShiftPlanComponent', () => {
  let component: ShiftPlanComponent;
  let fixture: ComponentFixture<ShiftPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftPlanComponent);
========
import { ActivityComponent } from './activity.component';

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityComponent);
>>>>>>>> Stashed changes:EventManagement/src/app/Shiftplan Component/activity/activity.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
