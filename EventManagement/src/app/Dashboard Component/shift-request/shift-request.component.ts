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
  activitys: any;
  openedRequest: any = null;
  showHelpers: boolean = false;


  constructor(private dashboardService: DashboardService, private eventService: EventService) { }

  toggleRequest(req: any) {
    this.openedRequest = this.openedRequest === req ? null : req;
  }

  toggleHelpers(req: any) {
    this.getHelper(req);
    this.showHelpers = !this.showHelpers;
  }
  accReq(request: any, event: MouseEvent) {
    event.stopPropagation();
    console.log("Accepting request for user ID: ", request);
    console.log("curr user: ", this.currentUser);
    if (this.currentUser != null) {
      this.dashboardService.acceptRequest(request.activities[0].id, request.shift_category_id, this.currentUser.id)
    }
  }

  getHelper(request: any) {
    console.log("Getting helpers for request: ", request, request.id);
    if (!request || !request.id) {
      console.error("Shift ID is missing.");
      return;
    }
    this.dashboardService.getShiftById(request.id).subscribe(shift => {
      if (shift) {

        this.activitys = shift.activities;

      }
    });
  }
  decReq(shift: any, event: MouseEvent) {
    event.stopPropagation();
    if (this.currentUser != null) {
      console.log("Declining request for user ID: ", this.currentUser.id, " shift: ", shift, shift.activities[0].id, shift.shift_category.id );
      this.dashboardService.declineRequest(shift.activities[0].id, shift.shift_category.id, this.currentUser.id);
    }
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
