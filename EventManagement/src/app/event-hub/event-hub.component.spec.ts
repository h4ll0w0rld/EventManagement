import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHubComponent } from './event-hub.component';

describe('EventHubComponent', () => {
  let component: EventHubComponent;
  let fixture: ComponentFixture<EventHubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventHubComponent]
    });
    fixture = TestBed.createComponent(EventHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
