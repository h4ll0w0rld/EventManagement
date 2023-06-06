import { Component } from '@angular/core';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { DashboardService } from 'src/app/Services/Dashboard Service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  shiftByUser: userActivity[] = [];

  constructor(private dashboardService: DashboardService) {

  }

  firstName = "Max";
  activities = [
    {
      "category": "Bar",
      "startTime": "18:00",
      "endTime": "22:00"
    },
    {
      "category": "Security",
      "startTime": "23:00",
      "endTime": "03:00"
    }
  ];


  category = "Bar";
  startTime = "18:00";
  endTime = "22:00";
  /*
    constructor() {
  
     
    }
    
    name = "zum"
    userActivities = 3
    activities = new Array(this.userActivities)
    */



  ngOnInit() {

    this.dashboardService.updateUserActivity();
    this.dashboardService.shiftsByUser.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftByUser = newValue;

    });
  }
}
