import { Component, Input } from '@angular/core';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';
import { DashboardService } from 'src/app/Services/Dashboard Service/dashboard.service';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-shift-request',
  templateUrl: './shift-request.component.html',
  styleUrls: ['./shift-request.component.scss']
})
export class ShiftRequestComponent {
  @Input() _shiftRequests: any;
  currentUser: string = "";
  constructor(private dashboardService: DashboardService, private eventService: EventServiceService) {}

  accReq(shift: userActivity) {

    this.dashboardService.accReq(shift.activityId, shift.categoryId, shift.userId)
  }

  decReq(shift: userActivity) {

    this.dashboardService.decReq(shift.activityId, shift.categoryId, shift.userId);
  }


}
