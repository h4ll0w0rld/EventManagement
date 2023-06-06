import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  firstName = "Max";
  activities = [
    { "category": "Bar",
      "startTime": "18:00",
      "endTime": "22:00"
    },
    { "category": "Security",
      "startTime": "23:00",
      "endTime": "03:00"}
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
}
