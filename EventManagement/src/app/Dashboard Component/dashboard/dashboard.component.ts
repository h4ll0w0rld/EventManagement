import { Component } from '@angular/core';
import { Shift } from 'src/app/Object Models/Dashboard Component/shift';
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

  shiftsByUser: Shift[] = [];

  selectedUser: User = new User(-1, "", "", "", "");

  allUser: User[] = []

  shiftRequests: Shift[] = []
 

  constructor(private dashboardService: DashboardService, private eventService: EventServiceService) {
   
    //this.selectedUser = this.allUser

  }


  clicked() {
    
    const stored: any = localStorage.getItem('selected-dashboard-user');
    const storedUser: any = JSON.parse(stored);

    const test = this.allUser.find(u => u.uuid === storedUser.uuid)
    this.selectedUser = <User>test;
    this.dashboardService.updateUserActivity(this.selectedUser.uuid, "confirmed")
    this.dashboardService.updateShiftReq(this.selectedUser.uuid, "requested")

  }


  ngOnInit() {

    this.eventService.getAllUser();

    this.dashboardService.shiftsByUser.subscribe((newValue) => {
      // Update the component with the new value
      //this.shiftsByUser = newValue;   //TTTTTTOOODODODODO

    });

    this.eventService.allUser.subscribe((newValue) => {
      // Update the component with the new value
      this.allUser = newValue;
      this.clicked()

    });
     this.dashboardService.shiftRequests.subscribe(shiftReqs => {
      this.shiftRequests = shiftReqs;
      //console.log("updatet", this.shiftRequests)

    })
    
     this.dashboardService.shiftsByUser.subscribe(shiftReqs => {
      this.shiftsByUser = shiftReqs;
      //console.log("updatet shifts ", this.shiftRequests)

    })

    const localUser: any = localStorage.getItem("user");
    this.selectedUser = JSON.parse(localUser)
    console.log("selected user: ", this.selectedUser.fName)


    //this.dashboardService.updateUserActivity();
  }

  getShiftHelper(){
  }

  

  changeUser() {
    console.log("changing user")
    this.dashboardService.updateUserActivity(this.selectedUser.uuid, "confirmed");
    this.dashboardService.updateShiftReq(this.selectedUser.uuid, "requested");
    localStorage.setItem('selected-dashboard-user', JSON.stringify(this.selectedUser));

  }
}
