import { Component, Input } from '@angular/core';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';
import { DashboardService } from 'src/app/core/features/dashboard/dashboard.service';
import { EventService } from 'src/app/core/features/events/event.service';

@Component({
  selector: 'app-shift-request',
  templateUrl: './shift-request.component.html',
  styleUrls: ['./shift-request.component.scss']
})
export class ShiftRequestComponent {
  @Input() _shiftRequests: any[] = [];
  @Input() currentUser: User | null = null;

  constructor(private dashboardService: DashboardService, private eventService: EventService) { }

  accReq(request: any) {
    console.log("Accepting request for user ID: ", request);
    console.log("curr user: ", this.currentUser);
    if (this.currentUser != null) {
      this.dashboardService.acceptRequest(request.activities[0].id, request.shift_category_id, this.currentUser.id)
    }
  }

  decReq(shift: userActivity) {

    this.dashboardService.declineRequest(shift.activityId, shift.categoryId, shift.userId);
  }

  nextDay(_request: any) {

    const shiftStart = new Date(_request.startTime);
    const shiftEnd = new Date(_request.endTime);

    if (shiftStart.getDate() != shiftEnd.getDate()) {

      return true;
    }

    return false;
  }
}
