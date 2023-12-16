import { Component } from '@angular/core';
import { userActivity } from 'src/app/Object Models/Dashboard Component/usermodel';
import { User } from 'src/app/Object Models/user/user';
import { DashboardService } from 'src/app/Services/Dashboard Service/dashboard.service';
import { EventServiceService } from 'src/app/Services/Event Service/event-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  shiftsByUser: userActivity[] = [];

  selectedUser: User = new User(1, "Nilsooo", "", "", "");

  allUser: User[] = []     //Can be updated using: /dashboarservice.getAllUser()

  shiftRequests = [
    {
      "catName": "Bar",
      "startTime": new Date("2023-08-10 13:00"),
      "endTime": new Date("2023-08-10 15:00"),
      "id": 500,
      "isActive": true,
      "shift_category_id": 200,
      "activities": []
    },
    {
      "catName": "Technik",
      "startTime": new Date("2023-08-10 15:00"),
      "endTime": new Date("2023-08-10 17:00"),
      "id": 500,
      "isActive": true,
      "shift_category_id": 200,
      "activities": []
    },
    {
      "catName": "Security",
      "startTime": new Date("2023-08-10 13:00"),
      "endTime": new Date("2023-08-11 15:00"),
      "id": 500,
      "isActive": true,
      "shift_category_id": 200,
      "activities": []
    }
  ]



  constructor(private dashboardService: DashboardService, private eventService: EventServiceService) {}


  clicked() {

    const stored: any = localStorage.getItem('selected-dashboard-user');
    const storedUser: any = JSON.parse(stored);

    const test = this.allUser.find(u => u.uuid === storedUser.uuid)
    this.selectedUser = <User>test;
    this.dashboardService.updateUserActivity(this.selectedUser.uuid)

  }
  
  
  ngOnInit() {

    this.eventService.getAllUser();

    this.dashboardService.shiftsByUser.subscribe((newValue) => {
      // Update the component with the new value
      this.shiftsByUser = newValue;

    });

    this.eventService.allUser.subscribe((newValue) => {
      // Update the component with the new value
      this.allUser = newValue;
      this.clicked()

    });

    this.dashboardService.updateUserActivity();
  }

  changeUser() {

    this.dashboardService.updateUserActivity(this.selectedUser.uuid);
    localStorage.setItem('selected-dashboard-user', JSON.stringify(this.selectedUser));

  }
}
