import { Component, Input } from '@angular/core';
import { DashboardService } from 'src/app/core/features/dashboard/dashboard.service';
import { Activity } from 'src/app/Object Models/Shiftplan Component/activityModel';
import { Shift } from 'src/app/Object Models/Shiftplan Component/shift';
import { User } from 'src/app/Object Models/user/user';

@Component({
  selector: 'app-dashboardactivity',
  templateUrl: './dashboardactivity.component.html',
  styleUrls: ['./dashboardactivity.component.scss'],
})
export class DashboardactivityComponent {
  @Input() start: string | null = '';
  @Input() end: string | null = '';
  @Input() date: string | null = '';
  @Input() role: string = "";
  @Input() description: string = "";
  @Input() activity: any;
  @Input() shift: any;


  showHelpers: boolean = false;
  constructor(private dbService: DashboardService) {


  }
  test() {

    console.log(this.activity[0].user, "are the helpers populated ?")
    console.log(this.activity, "full activity object")
    console.log(this.shift, "shift")
    this.getHelper();
  }
  toggleHelpers() {
    this.getHelper();
    this.showHelpers = !this.showHelpers;
  }
  
  nextDay(_request: any) {

    const shiftStart = new Date(_request.startTime);
    const shiftEnd = new Date(_request.endTime);

    if (shiftStart.getDate() != shiftEnd.getDate()) {

      return true;
    }

    return false;
  }



  getHelper() {
    if (!this.shift || !this.shift.id) {
      console.error("Shift ID is missing.");
      return;
    }
    this.dbService.getShiftById(this.shift.id).subscribe(shift => {
      if (shift) {

        this.activity = shift.activities;

      }
    });
  }

}


